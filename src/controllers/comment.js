const { Comment, Media, User, Reaction } = require("../models");
const { saveMedia } = require("./media.support");
const { v4 } = require("uuid");

const postComment = async (req, res) => {
  try {
    let { video_post_id, text, parent_id } = req.body;
    let user_id = req.auth.id;
    let comment = await Comment.create({
      video_post_id,
      user_id,
      text,
      parent_id,
    });
    return res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getCommentReactions = async (req, res) => {
  try {
    let { commentId } = req.params;
    let reactions = await Reaction.findAll({
      where: {
        comment_id: commentId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "user_name"],
        },
      ],
    });
    return res.status(200).json({ reactions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const socketCreateComment = async ({
  text,
  video_post_id,
  parent_id,
  user_id,
  image,
}) => {
  try {
    let comment = await Comment.create({
      text,
      video_post_id,
      parent_id,
      user_id,
    });

    if (image) {
      const media = await saveMedia({
        file: image,
        foreign: { comment_id: comment.id },
        storage: `comment-image/${v4()}.png`,
        type: "image",
      });
    }

    comment = await Comment.findOne({
      where: {
        id: comment.id,
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
    return comment;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { postComment, socketCreateComment, getCommentReactions };
