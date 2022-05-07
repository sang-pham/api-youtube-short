const { Reaction } = require("../../models");

const commentReactionSeeder = async () => {
  let below, above, mutex;
  try {
    for (let i = 1; i <= 15; i++) {
      mutex = 1 % 2 == 0;
      if (mutex) {
        below = Math.floor(Math.random() * 8) + 1;
        above = 8;
      } else {
        below = 1;
        above = Math.floor(Math.random() * 8) + 1;
      }
      for (let j = below; j <= above; j++) {
        await Reaction.create({
          type: "like",
          user_id: j,
          comment_id: i,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("comment reaction seed successfully");
};

module.exports = commentReactionSeeder;
