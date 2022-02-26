require("dotenv").config();
const userSeeder = require("./user");
const relationshipSeeder = require("./relationship");
const conversationSeeder = require("./conversation");
require("../../models");

(async () => {
  // await userSeeder();
  // await relationshipSeeder();
  await conversationSeeder();
  process.exit();
})();
