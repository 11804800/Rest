const express = require("express");
const cluster = require("node:cluster");
const os = require("os");
const cors = require("cors");
var path = require("path");
const indexRouter = require("./routes/index");
const user = require("./routes/user");
const mongoose = require("mongoose");
const notificationRouter = require("./routes/notification");

mongoose
  .connect("mongodb://127.0.0.1:27017/redis")
  .then((db) => {
    console.log("connected");
  })
  .catch((error) => console.log(error));

const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
  console.log("Primary cluster is running");
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
} else {
  var app = express();
  app.use(cors());
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", indexRouter);
  app.use("/user", user);
  app.use("/noti", notificationRouter);
  app.listen(4000, () => {
    console.log("server is up and running at 4000");
  });
}
