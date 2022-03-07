const router = require("express").Router();
const { getConversations, getConversationInfo, getMessages } = require('../controllers')

router.route("/")
    .get(getConversations);

router.get("/info", getConversationInfo);

router.get("/:conversationId/messages", getMessages);

module.exports = router;
