const express = require("express");
const bodyparser = require("body-parser");
const PostQueue = require("../producer");
const worker=require('../worker');
const limit = require("../ratelimit");
var notificationRouter = express.Router();
notificationRouter.use(bodyparser.json());

notificationRouter
  .route("/")
  .get((req, res) => {
    res.status(200).json("Welcome to the message queue");
  })
  .post(limit,(req, res) => {
    try {
      PostQueue(req.body.name, req.body.message);
      worker();
      res.json("Notification sent");
    } catch (error) {
      res.json(error);
    }
  });

module.exports = notificationRouter;
