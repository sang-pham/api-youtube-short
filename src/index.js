require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const sequelize = require("./models");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

sequelize.sync();

const app = express();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRoutes);
app.use("/", authRoutes);

app.listen(PORT, HOST, () => {
  console.log(`server is running on port ${HOST}:${PORT}`);
});
