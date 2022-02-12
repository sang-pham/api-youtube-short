const { User } = require("../models");
const fs = require("fs");
const Sequelize = require("sequelize");

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
    fs.createReadStream(user.avatar_path).pipe(res);
  } else {
    fs.createReadStream("./src/public/images/default_avatar.png").pipe(res);
  }
};

const update = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  let { first_name, last_name, user_name, email, description } = req.body;
  try {
    let avatar;
    let userId = Number(req.auth.id);
    let user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (req.file) {
      avatar = `./${req.file.path}`;
      if (user.avatar_path && avatar) {
        fs.unlink(user.avatar_path, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }
    if (avatar) {
      user.avatar_path = avatar;
    }
    if (first_name) {
      user.first_name = first_name;
    }
    if (last_name) {
      user.last_name = last_name;
    }
    if (user_name) {
      user.user_name = user_name;
    }
    if (email) {
      user.email = email;
    }
    if (description) {
      user.description = description;
    }
    await user.save();
    user.hash_password = undefined;
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeDatabaseError") {
      if (error.parent.errno == 1406) {
        return res.status(400).json({
          error: "Too large image to update",
        });
      }
    }
    return res.status(400).json({
      error,
    });
  }
};

const searchUsers = async (req, res) => {
  let { text } = req.query;
  console.log(text);
  try {
    let users;
    if (!text) {
      users = await User.findAll({
        attributes: ["first_name", "last_name", "user_name", "id"],
        limit: 10,
      });
    } else {
      users = await User.findAll({
        where: {
          [Sequelize.Op.or]: [
            Sequelize.where(
              Sequelize.fn(
                "concat",
                Sequelize.col("first_name"),
                " ",
                Sequelize.col("last_name")
              ),
              {
                [Sequelize.Op.like]: "%" + text + "%",
              }
            ),
            { user_name: { [Sequelize.Op.like]: "%" + text + "%" } },
          ],
        },
        attributes: ["first_name", "last_name", "user_name", "id"],
        limit: 10,
      });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = { getUserAvatar, update, searchUsers };
