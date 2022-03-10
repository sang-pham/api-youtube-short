const { Comment, Media, User } = require("../models");

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

const socketCreateComment = async ({
  text,
  video_post_id,
  parent_id,
  user_id,
}) => {
  try {
    let comment = await Comment.create({
      text,
      video_post_id,
      parent_id,
      user_id,
    });
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

module.exports = { postComment, socketCreateComment };
