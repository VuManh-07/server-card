const secp256k1 = require("secp256k1");
const elliptic = require("elliptic");
const { keccak256 } = require("js-sha3");
const ec = new elliptic.ec("secp256k1");
const crypto = require("crypto");
const api = require("../utils/axios");
const connectDB = require("../db/mongodb");

const eventLogin = (io, socket) => {
  //Handle event login card
  socket.on("client-wanna-login-card", (data) => {
    io.to(data.roomID).emit("request-login-card", data.pin);
  });

  socket.on("card-response-result-login-card", (data) => {
    io.to(data.roomID).emit("card-response-login-card", {
      result: data.result,
      message: data.message,
    });
  });

  //Hanlde event login page
  socket.on("client-wanna-login-page", (data) => {
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = parseInt(randomBytes.toString("hex"), 16);
    io.to(data.roomID).emit("request-sign-message", {
      message: randomNumber.toString(),
      clientID: data.clientID,
      pin: data.pin,
      index: 0,
    });
  });

  socket.on("card-response-result-sign-message", async (data) => {
    const { roomID, clientID, result, message, signature } = data;
    if (result) {
      const msgHash = keccak256(message);
      let publicKey = ec.recoverPubKey(
        Buffer.from(msgHash, "hex"),
        signature,
        signature.recoveryParam,
        "hex"
      );
      const publicKeyHex = publicKey.encode("hex");
      console.log(publicKeyHex);
      const key = ec.keyFromPublic(publicKeyHex, "hex");
      const isVerified = key.verify(msgHash, signature);
      if (isVerified) {
        const db = await connectDB("User");
        const collection = db.collection("userSV");
        const data = await collection.findOne({ publicKey: publicKeyHex });
        console.log("data", data);
        if (data != null) {
          api
            .post("/api/auth/login", {
              code: data.code,
              clientID,
            })
            .then(({ data }) => {
              console.log("token", data);
              io.to(roomID).emit("server-responce-login-page", {
                result: data.result,
              });
            });
        } else {
          io.to(roomID).emit("server-responce-login-page", {
            result: false,
            token: "",
            message: "Không tồn tại user.",
          });
        }
      } else {
        io.to(roomID).emit("server-responce-login-page", {
          result: false,
          token: "",
          message: "Please try again.",
        });
      }
    } else {
      io.to(roomID).emit("server-responce-login-page", {
        result: false,
        token: "",
        message: "Please try again.",
      });
    }
  });
};

module.exports = eventLogin;
