const { Relationship } = require("../../models");
const relationships = require("../data/relationship");

const relationshipSeeder = async () => {
  try {
    for (const relation of relationships) {
      await Relationship.create({
        status: relation.status,
        user_id: relation.user_id,
        relate_id: relation.relate_id,
      });
    }
    console.log("Seed relationships successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = relationshipSeeder;
