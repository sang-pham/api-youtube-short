const { Tag } = require("../../models");
const tags = require("../data/tag");

const tagSeeder = async () => {
  try {
    for (const tag of tags) {
      await Tag.create({
        name: tag.name,
      });
    }
    console.log("Seed tags successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = tagSeeder;
