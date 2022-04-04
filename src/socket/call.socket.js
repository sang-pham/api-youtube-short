const { emitToMany } = require("../lib");

const callSocket = (io, socket, userSockets) => {
  socket.on("video-call-start", ({ senderId, receiverId, chatBoxId }) => {
    emitToMany(socket, userSockets[receiverId], "video-call-start", {
      senderId,
      receiverId,
      chatBoxId,
    });
    console.log("call start");
  });

  socket.on("video-call-stop", ({ senderId, receiverId, chatBoxId }) => {
    emitToMany(socket, userSockets[receiverId], "video-call-stop", {
      senderId,
      receiverId,
      chatBoxId,
    });
    console.log("call stop");
  });

  socket.on("video-call-offer", ({ senderId, receiverId, payload }) => {
    emitToMany(socket, userSockets[receiverId], "video-call-offer", {
      senderId,
      receiverId,
      sdp: payload,
    });
    console.log(payload, receiverId);
  });

  socket.on("video-call-answer", ({ senderId, receiverId, payload }) => {
    emitToMany(socket, userSockets[receiverId], "video-call-answer", {
      senderId,
      receiverId,
      sdp: payload,
    });
  });

  socket.on("video-call-candidate", ({ senderId, receiverId, payload }) => {
    emitToMany(socket, userSockets[receiverId], "video-call-candidate", {
      senderId,
      receiverId,
      candidate: payload,
    });
  });
};

module.exports = callSocket;
