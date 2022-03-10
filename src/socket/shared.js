const emitToMany = (socket, sockets, evtName, payload) => {
  sockets.forEach((id) => {
    socket.to(id).emit(evtName, payload);
  });
};

module.exports = { emitToMany };
