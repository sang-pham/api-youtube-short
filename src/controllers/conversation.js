const { QueryTypes } = require('sequelize');
const { Conversation, User, sequelize } = require('../models');
const getConversations = async (req, res) => {
    try {
        const { id } = req.auth
        const conversations = await sequelize.query(
            "SELECT uc.conversation_id as id, uc.user_id as person_id, concat(u.first_name, ' ', u.last_name) as full_name, " +
            "u.status, uc_2.is_seen, u.updatedAt as seen_at, u.avatar_path " +
            "FROM user_conversation uc " +
            "JOIN (SELECT conversation_id, is_seen FROM user_conversation WHERE user_id = :id) uc_2 using(conversation_id) " +
            "JOIN users u on u.id = uc.user_id " +
            "WHERE uc.user_id NOT LIKE :id " +
            "ORDER BY uc.updatedAt DESC;",
            {
                replacements: {
                    id
                },
                type: QueryTypes.SELECT
            }
        )

        return res.status(200).json(conversations);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}


const getConversationInfo = async (req, res) => {
    const { userId, conversationId } = req.query;

    try {
        const conversation = conversationId && await Conversation.findByPk(conversationId);
        if (!userId) {
            return res.status(400).json('require userId');
        }

        const user = await User.findByPk(userId, {
            attributes: ["first_name", "last_name", "user_name", "avatar_path", ['id', 'person_id']],
        });

        return res.status(200).json({
            id: conversation?.id,
            full_name: user.fullName(),
            ...user.dataValues
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports = {
    getConversations, getConversationInfo
}