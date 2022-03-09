const { QueryTypes } = require('sequelize');
const { Conversation, User, sequelize, Message } = require('../models');

const { addUserConversation, getRecentMessage } = require('./conversation.support')

const getConversations = async (req, res) => {
	try {
		const { id } = req.auth

		let conversations = await sequelize.query(
			"SELECT uc.conversation_id as id, uc.user_id as person_id, concat(u.first_name, ' ', u.last_name) as full_name, " +
			"u.user_name, u.avatar_path, uc_2.is_seen " +
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

		conversations = await Promise.all(conversations.map(async (item) => {
			item.message = await getRecentMessage(item.id);
			return item;
		}))

		return res.status(200).json(conversations);
	} catch (error) {
		console.log(error)
		return res.status(500).json(error)
	}
}


const getConversationInfo = async (req, res) => {
	const { userId, conversationId, personId } = req.query;

	try {
		const user = await User.findByPk(personId, {
			attributes: ["first_name", "last_name", "user_name", "avatar_path", ['id', 'person_id']],
		});

		let conversation = conversationId && await Conversation.findByPk(conversationId);;

		if (!conversationId) {
			const query = await sequelize.query(
				"SELECT conversation_id as id " +
				"FROM user_conversation uc " +
				"JOIN (SELECT conversation_id FROM user_conversation WHERE user_id = :userId) uc2 using(conversation_id) " +
				"WHERE user_id = :personId ",
				{
					replacements: {
						userId, personId
					},
					type: QueryTypes.SELECT
				}
			);

			conversation = query.length && query[0];
		}

		const message = await getRecentMessage(conversationId);

		return res.status(200).json({
			id: conversation?.id,
			message,
			full_name: user.fullName(),
			...user.dataValues
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}

const setConversation = async ({ senderId, receiverId }) => {
	try {
		let conversation = (await sequelize.query(
			"SELECT conversation_id as id " +
			"FROM user_conversation uc " +
			"JOIN (SELECT conversation_id FROM user_conversation WHERE user_id = :senderId) uc2 using(conversation_id) " +
			"WHERE user_id = :receiverId ",
			{
				replacements: {
					senderId, receiverId
				},
				type: QueryTypes.SELECT
			}
		))[0];

		if (!conversation) {
			conversation = await Conversation.create({});
			await addUserConversation(conversation.id, senderId, receiverId);
		}


		return conversation;
	} catch (error) {
		console.log(error);
		return null;
	}
}


const getMessages = async (req, res) => {
	try {
		const { conversationId } = req.params;

		const messages = await Message.findAll({
			where: {
				conversation_id: conversationId,
			},
		})

		return res.status(200).json(messages);

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: "Server error!"
		})
	}
}


module.exports = {
	getConversations, getConversationInfo, setConversation,
	getMessages,
}