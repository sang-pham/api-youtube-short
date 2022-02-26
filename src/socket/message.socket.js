
const emitToMany = (socket, array, eName, data) => {
  array?.foreach(e => {
    socket.to(e.id).emit(eName, data);
  });
}

const messageSocket = (io, socket, userSockets) => {
  socket.on('send-message', (data) => {
    console.log(data);
    emitToMany(socket, userSockets[data.receiverId], 'receive-message', data);
  })
}

module.exports = messageSocket;