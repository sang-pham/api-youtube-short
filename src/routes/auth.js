const { Router } = require("express");
const { signin } = require("../controllers/auth");

const router = Router();

router.route("/api/signin").post(signin);

module.exports = router;
