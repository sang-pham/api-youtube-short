const router = require("express").Router();
const {
  getFollowingVideoPosts,
  getVideoPostById,
  getVideoById,
  getVideoPostComments,
  getVideoPostReactions,
  getSuggestVideoPosts,
  getVideoPostsByTag,
  getVideoPostByTagId,
} = require("../controllers");

router.route("/following").get(getFollowingVideoPosts);

router.get("/suggest", getSuggestVideoPosts);

router.get("/get-by-tag", getVideoPostsByTag);

router.get("/get-by-tag/:tagId", getVideoPostByTagId);

router.get("/:videoPostId", getVideoPostById);

router.get("/:videoPostId/video", getVideoById);

router.get("/:videoPostId/comments", getVideoPostComments);

router.get("/:videoPostId/reactions", getVideoPostReactions);

module.exports = router;
