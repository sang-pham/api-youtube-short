const { User } = require("../../models");
const users = require("../data/user");
const bcrypt = require("bcrypt");

let saltRounds = 10;

const userSeeder = async () => {
  try {
    for (const user of users) {
      let hash_password = await bcrypt.hash(user.password, saltRounds);
      await User.create({
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.user_name,
        email: user.email,
        hash_password,
      });
    }
    console.log("Seed users successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = userSeeder;
