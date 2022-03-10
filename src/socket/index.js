const messageSocket = require("./message.socket");
const commentSocket = require("./comment.socket");
const userSockets = {};
const { socketCreateComment } = require("../controllers");
const { emitToMany } = require("./shared");

const videoPostSockets = {};

module.exports = (io, socket) => {
  if (!userSockets[socket.userId]) {
    userSockets[socket.userId] = [socket.id];
  } else {
    userSockets[socket.userId].push(socket.id);
  }

  messageSocket(io, socket, userSockets);

  commentSocket(io, socket);

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
};
