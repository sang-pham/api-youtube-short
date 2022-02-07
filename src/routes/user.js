const { Router } = require("express");
const { signup } = require("../controllers/user");

const router = Router();

router.route("/api/signup").post(signup);

module.exports = router;
