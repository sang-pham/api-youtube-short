const { setConversation, setMessage, getPerson } = require('../controllers')

const emitToMany = (socket, sockets, evtName, payload) => {
  sockets?.forEach(id => {
    socket.to(id).emit(evtName, payload);
  });
}

const messageSocket = (io, socket, userSockets) => {
  socket.on('send-message', async ({ text, senderId, receiverId, v4Id }) => {
    const conversation = await setConversation({
      senderId,
      receiverId
    })

    const message = await setMessage({ text, conversationId: conversation.id, senderId });

    let person = await getPerson(receiverId);

    socket.emit('sent-message', { message, conversation, person, v4Id });

    person = await getPerson(senderId);

    emitToMany(socket, userSockets[receiverId], 'receive-message', {
      message,
      conversation,
      person
    });
  })
}

module.exports = messageSocket;