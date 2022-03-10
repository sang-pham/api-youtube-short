const { socketCreateComment } = require("../controllers");
const { emitToMany } = require("./shared");

const videoPostSockets = {};

const commentSocket = (io, socket) => {
  //video-post
  socket.on("current-video-post", ({ video_post_id }) => {
    console.log(`current video post id ${video_post_id} ${socket.id}`);
    for (const videoPostId in videoPostSockets) {
      videoPostSockets[videoPostId] = videoPostSockets[videoPostId].filter(
        (_id) => _id != socket.id
      );
      if (!videoPostSockets[videoPostId].length) {
        delete videoPostSockets[videoPostId];
      }
    }
    if (!videoPostSockets[video_post_id]) {
      videoPostSockets[video_post_id] = [socket.id];
    } else {
      videoPostSockets[video_post_id].push(socket.id);
    }
    console.log(videoPostSockets);
  });

  //comment
  socket.on(
    "post-comment",
    async ({ text, video_post_id, parent_id, user_id }) => {
      let comment = await socketCreateComment({
        text,
        video_post_id,
        parent_id,
        user_id,
      });
      if (comment) {
        console.log(comment);
        socket.emit("new-comment", comment);
        emitToMany(
          socket,
          videoPostSockets[video_post_id],
          "new-comment",
          comment
        );
      }
    }
  );
};

module.exports = commentSocket;
