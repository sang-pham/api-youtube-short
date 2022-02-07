const { Router } = require("express");
const { signup } = require("../controllers/user");

const router = Router();

router.route("/signup")
    .post(signup);

module.exports = router;
