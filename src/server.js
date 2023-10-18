const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const http = require("http");
const socketIO = require("socket.io");
const eventLogin = require("./event-socket/login");
const eventSinhVien = require("./event-socket/sinhvien");
const eventPayment = require("./event-socket/payment");
const eventAddminCard = require("./event-socket/admin.card");
const route = require("./routes");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3030;
const uri =
  process.env.URI_DB ||
  "mongodb+srv://server-card:server-card@cluster0.hl6q5ua.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle sự kiện kết nối và tạo phòng (room)
  socket.on("join", (roomID) => {
    console.log(roomID);
    socket.join(roomID); // Tham gia phòng với roomId đã được chỉ định
  });

  eventLogin(io, socket);
  eventSinhVien(io, socket);
  eventPayment(io, socket);
  eventAddminCard(io, socket);

  // Ngắt kết nối khi client thoát
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

route(app);

app.get('/', (req, res) =>{
  res.send('Welcom back to server card !!!')
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
