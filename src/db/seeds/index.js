require("dotenv").config();
const userSeeder = require("./user");
const relationshipSeeder = require("./relationship");
const tagSeeder = require("./tag");
const videoPostSeeder = require("./videoPost");
const commentSeeder = require("./comment");
const conversationSeeder = require("./conversation");
const videoPostReactionSeeder = require("./videoPostReaction");

(async () => {
  await userSeeder();
  await relationshipSeeder();
  await tagSeeder();
  await videoPostSeeder();
  await videoPostReactionSeeder();
  await commentSeeder();
  await conversationSeeder();
  process.exit();
})();
