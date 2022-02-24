require("dotenv").config();
const userSeeder = require("./user");
const relationshipSeeder = require("./relationship");
const tagSeeder = require("./tag");
const videoPostSeeder = require("./videoPost");

require("../../models");

(async () => {
  await userSeeder();
  await relationshipSeeder();
  await tagSeeder();
  await videoPostSeeder();
  process.exit(1);
})();
