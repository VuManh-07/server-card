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

//connect db
require("./db/mongodb");

// route
route(app);

app.get("/", async (req, res) => {
  res.send({ name: "VĐM", code: "B19DCVT247", class: "D19CQVT07-B" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
