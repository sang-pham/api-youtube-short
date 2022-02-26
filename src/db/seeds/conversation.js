const { QueryTypes } = require("sequelize");
const { Conversation, User, sequelize } = require("../../models");

const conversationSeeder = async () => {
  try {
    let user_1 = await User.findByPk(1);
    let user_2 = await User.findByPk(2);
    let cons = await Conversation.create({})
    await user_1.addConversation(cons);
    await user_2.addConversation(cons);

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
