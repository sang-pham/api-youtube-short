const router = require("express").Router();
const { getConversations, getConversationInfo } = require('../controllers')

router.route("/")
    .get(getConversations);

router.get("/info", getConversationInfo);


module.exports = router;
