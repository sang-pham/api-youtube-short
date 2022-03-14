const router = require("express").Router();
const {
  getFollowingVideoPosts,
  getVideoPostById,
  getVideoById,
  getVideoPostComments,
  getVideoPostReactions,
  getSuggestVideoPosts,
} = require("../controllers");

router.route("/following").get(getFollowingVideoPosts);

router.get("/suggest", getSuggestVideoPosts);

router.get("/:videoPostId", getVideoPostById);

router.get("/:videoPostId/video", getVideoById);

router.get("/:videoPostId/comments", getVideoPostComments);

router.get("/:videoPostId/reactions", getVideoPostReactions);

module.exports = router;
