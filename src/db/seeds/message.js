const { Message } = require("../../models");

const messageSeeder = async () => {
  try {

    await Message.create({});

  } catch (error) {
    console.log(error);
  }
};

module.exports = messageSeeder;
