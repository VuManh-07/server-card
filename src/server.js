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
const connectDB = require("./db/mongodb");

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));

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

app.get("/",async (req, res) => {
  const db = await connectDB('Card');
  const collection = db.collection('students');
  const result = await collection.findOne({code: 'B19DVCT247'});
  console.log(result);
  res.send(result);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
