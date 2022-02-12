require("dotenv").config();
const userSeeder = require("./user");
const relationshipSeeder = require("./relationship");

require("../../models");

(async () => {
  await userSeeder();
  await relationshipSeeder();
  process.exit(1);
})();
