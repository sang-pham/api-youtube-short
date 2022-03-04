const { Comment } = require("../models");

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

module.exports = { postComment };
