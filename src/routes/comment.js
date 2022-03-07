const router = require("express").Router();
const { postComment } = require("../controllers");

router.post("", postComment);

module.exports = router;
