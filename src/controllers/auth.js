const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isPasswordMatch = await bcrpyt.compare(
        password,
        user.hash_password
      );
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ error: "Email and Password haven't matched" });
      }
      const token = jwt.sign(
        {
          id: user.id,
          name: user.first_name + " " + user.last_name,
          company: "SPICY_CODE",
          role: user.role,
        },
        process.env.JWT_SECRET_KEY
      );

      return res.status(200).json({
        token,
        last_name: user.last_name,
        first_name: user.first_name,
        user_name: user.user_name,
        id: user.id,
        avatar_path: user.avatar_path,
      });
    } else {
      return res.status(401).json({ error: "Email not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = { signin };
