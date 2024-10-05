const express = require("express");
const user = express.Router();
const bodyparser = require("body-parser");
user.use(bodyparser.json());
const userSchema = require("../model/user");
const client = require("../client");

user
  .route("/")
  .get(async (req, res) => {
    try {
      const redisResult = await client.get("user");
      if (redisResult === null) {
        const result = await userSchema.find({});
        if (result.length !== 0) {
          await client.setex("user", 120, JSON.stringify(result));
        }
        res.status(200).json({ server: true, data: result });
      } else {
        res.status(200).json({ server: false, data: JSON.parse(redisResult) });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      let user = new userSchema({
        name: req.body.name,
      });
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await userSchema.deleteMany();
      await client.del("user");
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

user.route("/:id").get(async (req, res) => {
  try {
    const redisResult=await client.get("user");
    if(redisResult===null)
    {
        const result=await userSchema.findById(req.params.id);
        res.json({server:true,data:result});
    }
    else
    {
        const arr=JSON.parse(redisResult);
        res.status(200).json({server:false,data:arr.filter((item)=>item._id===req.params.id)});
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = user;
