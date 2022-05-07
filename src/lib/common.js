const { Readable } = require('stream')

const emitToMany = (socket, sockets, evtName, payload) => {
  sockets?.forEach((id) => {
    socket.to(id).emit(evtName, payload);
  });
};

function bufferToStream(buffer) {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    }
  });
}
module.exports = { emitToMany, bufferToStream };
