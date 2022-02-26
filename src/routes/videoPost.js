const router = require("express").Router();
const {
  getFollowingVideoPosts,
  getVideoPostById,
  getVideoById,
} = require("../controllers");

router.route("/following").get(getFollowingVideoPosts);

router.get("/:videoPostId", getVideoPostById);

router.get("/:videoPostId/video", getVideoById);

module.exports = router;
