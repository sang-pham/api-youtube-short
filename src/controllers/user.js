const bcrypt = require("bcrypt");
const User = require("../models/user");

let saltRounds = 10;

const signup = async (req, res) => {
  const { first_name, last_name, user_name, email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ error: `${email} has already existed` });
    }
    bcrypt.hash(password, saltRounds, async (error, hash_password) => {
      if (error) {
        return res.status(400).json({ error });
      }
      const newUser = await User.create({
        first_name,
        last_name,
        user_name,
        email,
        hash_password,
      });
      newUser.hash_password = undefined;
      return res.status(201).json({ user: newUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = { signup };
