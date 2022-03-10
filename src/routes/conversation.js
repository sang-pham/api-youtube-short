const router = require("express").Router();
const { getConversations, getConversationInfo, getMessages, getNumberOfUnRead, deleteMessage } = require('../controllers');


router.route("/")
    .get(getConversations);

router.get("/info", getConversationInfo);

router.get("/unread", getNumberOfUnRead);

router.get("/:conversationId/messages", getMessages);

router.delete("/:conversationId/message/:messageId", deleteMessage);

module.exports = router;
