


const eventPayment = (io, socket) => {
   socket.on("res-handle-payment", (data)=>{ 
     if(data.result){
         io.to(data.clientID).emit("return-handle-payment", {message: "Thành công.", amount: data.amount})
     }else{
        io.to(data.clientID).emit("return-handle-payment", {message: "Thất bại.", amount: null})
     }
   })

   socket.on("client-wanna-create-payment", (data)=>{
      console.log("client-wanna-create-payment")
      io.to(data.roomID).emit("request-create-payment")
   })

   socket.on("event-window-closed", (data)=>{
      io.to(data.roomID).emit("window-closed")
   }) 

   socket.on("payment-success-and-close", (data)=>{
      io.to(data.clientID).emit("request-close-payment")
   })

   socket.on("client-wanna-close-payment", (data)=>{
      io.to(data.roomID).emit("close-payment")
   })

   // get & update amount
   //*get
   socket.on("client-wanna-get-amount", (data)=>{
      io.to(data.roomID).emit("request-get-amount")
   })

   socket.on("card-response-result-get-amount", (data)=>{
      io.to(data.roomID).emit("response-get-amount", {
         result: data.result,
         amount: data.amount
      })
   })
   //*update
   socket.on("client-wanna-update-amount", (data) => {
      io.to(data.roomID).emit("request-update-amount",{
         state: data.state,
         amount: data.amount
      })
   })

   socket.on("card-response-result-update-amount", (data) => {
      io.to(data.roomID).emit("response-update-amount", {
         result: data.result 
      })
   })


}

module.exports = eventPayment