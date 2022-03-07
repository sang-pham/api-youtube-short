const { VideoPost, Tag, User, Relationship } = require("../models");
const axios = require("axios");

const getFollowingVideoPosts = async (req, res) => {
  try {
    let userId = req.params.userId || req.auth.id;
    let page = req.query.page || 0;
    let perPage = req.query.per_page || 10;
    let followings = await Relationship.findAll({
      where: {
        user_id: userId,
        status: "follow",
      },
      attributes: ["relate_id"],
    });
    followings = followings.map((following) => following.relate_id);
    let videoPosts = await VideoPost.findAll({
      where: {
        user_id: followings,
      },
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "first_name", "last_name", "user_name", "email"],
        },
      ],
      order: [["createdAt", "ASC"]],
      offset: page * perPage,
      limit: perPage,
    });
    return res.status(200).json({
      videoPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getVideoPostById = async (req, res) => {
  let videoPostId = req.params.videoPostId;
  let videoPost = await VideoPost.findOne({
    where: {
      id: videoPostId,
    },
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "first_name", "last_name", "user_name", "email"],
      },
    ],
  });
  return res.status(200).json({ videoPost });
};

const getVideoById = async (req, res) => {
  try {
    let videoPostId = req.params.videoPostId;
    let videoPost = await VideoPost.findOne({
      where: {
        id: videoPostId,
      },
      attributes: ["video_path"],
    });
    if (!videoPost) {
      return res.status(500).json({
        message: "Something wrong",
      });
    }
    let videoPath =
      videoPost.video_path ||
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
    axios({
      method: "get",
      url: videoPath,
      responseType: "stream",
    })
      .then((response) => response.data.pipe(res))
      .catch((error) => console.log(error));
    // return res.status(200).json({ videoPath });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = { getFollowingVideoPosts, getVideoPostById, getVideoById };
