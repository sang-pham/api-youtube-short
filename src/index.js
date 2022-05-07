require("dotenv").config();
require("./models");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const socketServer = require('./socket');
const io = require('socket.io')(server, {
  cors: '*',
  maxHttpBufferSize: 1e6 * 6
})

const routes = require("./routes");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use(require("./authenticate"));

for (let route in routes) {
  app.use(route, routes[route]);
}

io.use((socket, next) => {
  const userID = socket.handshake.auth.userId;
  if (!userID) {
    return next(new Error("invalid userId"));
  }
  socket.userId = userID;
  next();
})

io.on('connection', socket => {
  console.log(socket.userId, 'connect successfuly')
  socketServer(io, socket)
});

server.listen(PORT, HOST, () => {
  console.log(`server is running on port ${HOST}:${PORT}`);
});
