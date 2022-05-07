const router = require("express").Router();
const { postComment, getCommentReactions } = require("../controllers");

router.post("", postComment);

router.get("/:commentId/reactions", getCommentReactions);

module.exports = router;
