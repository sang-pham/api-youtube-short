require("dotenv").config();
const userSeeder = require("./user");

require("../../models");

(async () => {
  await userSeeder();
  process.exit(1);
})();
