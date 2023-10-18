const eventAddminCard = (io, socket) => {
    socket.on("event-card-inserted", (data) => {
        console.log(data);
        io.to(data.roomID).emit("card-inserted")
    })

    socket.on("event-card-removed", (data) => {
        console.log(data);
        io.to(data.roomID).emit("card-removed")
    })

    socket.on("response-install", (data) => {
        console.log(data);
        io.to(data.roomID).emit("install-card", data)
    })

    socket.on("response-install-card-removed", (data) => {
        console.log(data);
        io.to(data.roomID).emit("install-next", data)
    })

    socket.on("response-info-student", (data)=>{
        console.log("response-info-student",data);
        console.log("response-info-student",data.roomID);
        io.to(data.roomID).emit("res-inf-student", {inf_student: data.res_inf})
    })
}

module.exports = eventAddminCard;