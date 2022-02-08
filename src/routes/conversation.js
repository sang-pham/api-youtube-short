const router = require("express").Router();
const { test } = require('../controllers')

router.route("/")
    .get(test);

module.exports = router;
