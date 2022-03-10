const { Message, User } = require("../models");
const { sequelize } = require("../models/user");



const addUserConversation = async (conversationId, userId_1, userId_2) => {
  return await sequelize.query(
    "INSERT INTO user_conversation(createdAt, updatedAt, user_id, conversation_id) " +
    "VALUES (NOW(), NOW(), :userId_1, :conversationId), (NOW(), NOW(), :userId_2, :conversationId)",
    {
      replacements: {
        conversationId,
        userId_1,
        userId_2
      }
    }
  );
}

const readMessage = async (conversationId, userId) => {
  if (!conversationId) return false;
  await sequelize.query(
    "UPDATE user_conversation SET updatedAt = NOW(), is_seen = 1 " +
    "WHERE conversation_id = :conversationId AND user_id = :userId",
    {
      replacements: {
        conversationId,
        userId
      }
    }
  )

  return true;
}

const unReadMessage = async (conversationId, userId) => {
  if (!conversationId) return false;
  await sequelize.query(
    "UPDATE user_conversation SET updatedAt = NOW(), is_seen = 0 " +
    "WHERE conversation_id = :conversationId AND user_id = :userId",
    {
      replacements: {
        conversationId,
        userId
      }
    }
  )

  return true;
}

const setMessage = async ({ text, conversationId, senderId, receiverId }) => {
  try {
    const message = await Message.create({
      text,
      conversation_id: conversationId,
      user_id: senderId
    });

    await readMessage(conversationId, senderId);
    await unReadMessage(conversationId, receiverId);

    return message;
  } catch (error) {
    console.log('message', error)
    return null;
  }
}

const getRecentMessage = async (conversationId) => {

  const message = await Message.findOne({
    where: {
      conversation_id: conversationId
    },
    order: [['createdAt', 'DESC']],
    limit: 1
  })

  return message;
}

const getPerson = async (userId) => {
  const person = await User.findByPk(userId, {
    attributes: ["first_name", "last_name",
      "user_name", "avatar_path", ['id', 'person_id']],
  });

  return {
    full_name: person.fullName(),
    ...person.dataValues
  }

}

module.exports = {
  unReadMessage, addUserConversation, readMessage,
  getRecentMessage, setMessage, getPerson
}