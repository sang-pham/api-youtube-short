const messageSocket = require("./message.socket");
const videoPostSocket = require("./video-post.socket");
const userSockets = {};

module.exports = (io, socket) => {
  if (!userSockets[socket.userId]) {
    userSockets[socket.userId] = [socket.id];
  } else {
    userSockets[socket.userId].push(socket.id);
  }

  messageSocket(io, socket, userSockets);

  videoPostSocket(io, socket);

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
};
