

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
}

module.exports = eventSinhVien;