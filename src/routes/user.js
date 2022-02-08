const { Router } = require("express");
const { getUserAvatar } = require("../controllers/user");

const router = Router();

router.route("/avatar/:userId").get(getUserAvatar);

module.exports = router;
