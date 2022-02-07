const { Router } = require("express");
const { signin } = require("../controllers/auth");

const router = Router();

router.route("/signin")
    .post(signin);

module.exports = router;
