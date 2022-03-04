const comments = require("../data/comment");
const { Comment } = require("../../models");

const commentSeeder = async () => {
  for (const comment of comments) {
    await Comment.create(comment);
  }
  console.log("Seed comment successfully");
};

module.exports = commentSeeder;
