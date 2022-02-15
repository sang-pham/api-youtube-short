const {
  updateOrCreate,
  getFriends,
  getFollowings,
  getFollowers,
  getBlocks,
  deleteRelationship,
} = require("../controllers/relationship");

const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {
    return res.status(200).json({ message: "fdasfdas" });
  })
  .post(updateOrCreate);

router.get("/:userId/friends", getFriends);

router.get("/:userId/followings", getFollowings);

router.get("/:userId/followers", getFollowers);

router.get("/blocks", getBlocks);

router.delete("/:relationshipId", deleteRelationship);

module.exports = router;
