const express = require("express");
const app = express();
const mongoose = require(`mongoose`);
app.use(express.json());
mongoose.connect("mongodb+srv://msierra773:123@cluster0.jslp3iw.mongodb.net/");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/bounties", require("./routes/bountiesRoute.js"));

app.use((err, req, res, next) => {
  console.log(err);
  return res, send({ errMsg: err.message });
});

app.use(express.static(path.join(__dirname, './client/build')));


//  app.listen(6300, () => {
//    console.log(" the server is running on port 6300");
//  });

const port = process.env.PORT || 6300;
server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
