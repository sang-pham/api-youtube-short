const {
  VideoPost,
  Tag,
  User,
  Relationship,
  Comment,
  Media,
  Reaction,
} = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
const fs = require("fs");

const getFollowingVideoPosts = async (req, res) => {
  try {
    let userId = req.params.userId || req.auth.id;
    let page = (Number(req.query.page) || 1) - 1;
    let perPage = Number(req.query.per_page) || 10;
    let followings = await Relationship.findAll({
      where: {
        user_id: userId,
        status: "follow",
      },
      attributes: ["relate_id"],
      order: [["relate_id", "ASC"]],
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
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "user_id"],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        ["user_id", "ASC"],
      ],
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

const getSuggestVideoPosts = async (req, res) => {
  try {
    let userId = req.params.userId || req.auth.id;
    let page = (Number(req.query.page) || 1) - 1;
    let perPage = Number(req.query.per_page) || 10;
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
        user_id: { [Op.notIn]: [followings] },
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
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "user_id"],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        ["user_id", "ASC"],
      ],
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
    // let videoPostId = req.params.videoPostId;
    // let videoPost = await VideoPost.findOne({
    //   where: {
    //     id: videoPostId,
    //   },
    //   attributes: ["video_path"],
    // });
    // if (!videoPost) {
    //   return res.status(500).json({
    //     message: "Something wrong",
    //   });
    // }
    // let videoPath =
    //   videoPost.video_path ||
    //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
    // axios({
    //   method: "get",
    //   url: videoPath,
    //   responseType: "stream",
    // })
    //   .then((response) => response.data.pipe(res))
    //   .catch((error) => console.log(error));
    const path =
      Math.random() > 0.5
        ? "./src/public/ForBiggerBlazes.mp4"
        : "./src/public/ForBiggerFun.mp4";
    return fs.createReadStream(path).pipe(res);
    // return res.status(200).json({ videoPath });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getComment = async (commentId) => {
  let comment = await Comment.findOne({
    where: {
      id: commentId,
    },
    include: [
      {
        model: Comment,
        as: "comments",
      },
      {
        model: Media,
        as: "media",
      },
      {
        model: User,
        as: "user",
        attributes: ["user_name"],
      },
    ],
  });
  if (comment && comment.comments) {
    for (let i = 0; i < comment.comments.length; i++) {
      if (comment.comments[i]) {
        comment.comments[i] = await getComment(comment.comments[i].id);
      }
    }
  }
  return comment;
};

const getVideoPostComments = async (req, res) => {
  try {
    let videoPostId = req.params.videoPostId;
    let comments = await Comment.findAll({
      where: {
        video_post_id: videoPostId,
        parent_id: null,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["user_name"],
        },
        {
          model: Media,
          as: "media",
        },
      ],
      attributes: ["id"],
      order: [["createdAt", "DESC"]],
    });
    for (let i = 0; i < comments.length; i++) {
      if (comments[i]) {
        comments[i] = await getComment(comments[i].id);
      }
    }
    return res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getVideoPostReactions = async (req, res) => {
  try {
    let videoPostId = req.params.videoPostId;
    let reactions = await Reaction.findAll({
      where: {
        video_post_id: videoPostId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "user_name"],
        },
      ],
      attributes: ["id", "type"],
    });
    return res.status(200).json({ reactions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getVideoPostsByTag = async (req, res) => {
  try {
    let tags = await Tag.findAll({
      include: [
        {
          model: VideoPost,
          as: "videoPosts",
          attributes: ["id", "caption", "video_path"],
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    tags = tags.map((tag) => {
      tag.videoPosts = tag.videoPosts.map((videoPost) => {
        videoPost.video_tag.dataValues = undefined;
        return videoPost;
      });
      return tag;
    });
    return res.status(200).json({ tags });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getVideoPostByTagId = async (req, res) => {
  try {
    let { tagId } = req.params;
    let tag = await Tag.findOne({
      where: {
        id: tagId,
      },
      include: [
        {
          model: VideoPost,
          as: "videoPosts",
          attributes: ["id", "caption", "video_path"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: User,
              as: "user",
              attributes: [
                "id",
                "first_name",
                "last_name",
                "user_name",
                "email",
              ],
            },
          ],
        },
      ],
    });
    if (tag) {
      tag.videoPosts = tag.videoPosts.map((videoPost) => {
        videoPost.video_tag.dataValues = undefined;
        return videoPost;
      });
    }
    return res.status(200).json({ tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  getFollowingVideoPosts,
  getVideoPostById,
  getVideoById,
  getVideoPostComments,
  getVideoPostReactions,
  getSuggestVideoPosts,
  getVideoPostsByTag,
  getVideoPostByTagId,
};
