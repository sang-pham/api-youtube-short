const { setConversation, saveMessage, getPerson } = require("../controllers");
const { emitToMany } = require("../lib");

const messageSocket = (io, socket, userSockets) => {

  socket.on("send-message", async ({ text, image, senderId, receiverId, v4Id }) => {
    const conversation = await setConversation({
      senderId,
      receiverId,
    });

    const message = await saveMessage({
      text,
      conversationId: conversation.id,
      senderId,
      receiverId,
      image
    });

    let person = await getPerson(receiverId);

    socket.emit("sent-message", { message, conversation, person, v4Id });

    person = await getPerson(senderId);

    emitToMany(socket, userSockets[receiverId], "receive-message", {
      message,
      conversation,
      person,
    });
  });
};

module.exports = messageSocket;
