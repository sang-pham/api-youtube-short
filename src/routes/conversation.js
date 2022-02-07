const router = require("express").Router();


router.route("/")
    .get((req, res) => {
        console.log('abc');
        res.send('hello');
    });

module.exports = router;
