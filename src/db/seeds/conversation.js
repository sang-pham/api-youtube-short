const { QueryTypes } = require("sequelize");
const { Conversation, User, sequelize, Message } = require("../../models");

const conversationSeeder = async () => {
  try {
    const user_1 = await User.findByPk(1);
    const user_2 = await User.findByPk(2);
    const cons = await Conversation.create({});
    await user_1.addConversation(cons);
    await user_2.addConversation(cons);

    const data = [
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_2.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_1.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_1.id,
      },
      {
        text: 'hello',
        conversation_id: cons.id,
        user_id: user_1.id,
      }
    ]

    await Promise.all(data.map(async(item) => {
      await Message.create(item);
      return item;
    }))

    console.log('Seed conversation and message done');

    // await Message.create({
    //   text: 'hello',
    //   conversation_id: cons.id,
    //   user_id: user_2.id,
    // })

    // await Message.create({
    //   text: 'hi',
    //   conversation_id: cons.id,
    //   user_id: user_1.id,
    // })

    // const conversations = await sequelize.query(
    //   "SELECT uc.conversation_id, uc.user_id as person_id, concat(u.first_name, ' ', u.last_name) as full_name, " +
    //   "u.status, uc_2.is_seen, u.updatedAt as seen_at " +
    //   "FROM user_conversation uc " +
    //   "JOIN (SELECT conversation_id, is_seen FROM user_conversation WHERE user_id = :id) uc_2 using(conversation_id) " +
    //   "JOIN users u on u.id = uc.user_id " +
    //   "WHERE uc.user_id NOT LIKE :id " +
    //   "ORDER BY uc.updatedAt DESC;",
    //   {
    //     replacements: {
    //       id: 1
    //     },
    //     type: QueryTypes.SELECT
    //   }
    // )
    // console.log(conversations);

  } catch (error) {
    console.log(error);
  }
};



module.exports = conversationSeeder;
