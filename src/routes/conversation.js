const router = require("express").Router();
const { getConversations, getConversationInfo, getMessages, getNumberOfUnRead } = require('../controllers')

router.route("/")
    .get(getConversations);

router.get("/info", getConversationInfo);

router.get("/unread", getNumberOfUnRead);

router.get("/:conversationId/messages", getMessages);


module.exports = router;
