require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");

require("./models");

const app = express();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use(require("./authenticate"));

const routes = require("./routes");
for (let route in routes) {
  app.use(route, routes[route]);
}

app.listen(PORT, HOST, () => {
  console.log(`server is running on port ${HOST}:${PORT}`);
});
