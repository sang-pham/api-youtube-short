const {
  updateOrCreate,
  getFriends,
  getFollowings,
  getFollowers,
  getBlocks,
} = require("../controllers/relationship");

const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {
    return res.status(200).json({ message: "fdasfdas" });
  })
  .post(updateOrCreate);

router.get("/friends", getFriends);

router.get("/followings", getFollowings);

router.get("/followers", getFollowers);

router.get("/blocks", getBlocks);

module.exports = router;
