const { User } = require("../models");
const fs = require("fs");

const getUserAvatar = async (req, res) => {
  let { userId } = req.params;
  let user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: ["avatar_path"],
  });

  if (!user) {
    return res.status(400).json({
      error: "Could not get avatar!",
    });
  }

  if (user.avatar_path) {
    fs.createReadStream(`./src/public/users-avatars/${user.avatar_path}`).pipe(
      res
    );
  } else {
    fs.createReadStream("./src/public/images/default_avatar.png").pipe(res);
  }
};

module.exports = { getUserAvatar };
