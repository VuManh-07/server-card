

const eventSinhVien = (io, socket) =>{
     socket.on("client-wanna-get-inf-student", (data) =>{ 
          io.to(data.roomID).emit("request-get-inf-student")
     })

     socket.on("card-response-result-get-inf-student", (data) =>{ 
          io.to(data.roomID).emit("response-get-inf-student", {
               result: data.result,
               info: data.info
          })
     })

     socket.on("client-wanna-change-pin", (data) => {
          io.to(data.roomID).emit("request-change-pin", {
               oldPin: data.oldPin, 
               newPin: data.newPin
          })
     })

     socket.on("card-response-result-change-pin", (data) => {
          io.to(data.roomID).emit("response-change-pin", {
               result: data.result,
               message: data.message
          })
     })
}

module.exports = eventSinhVien;