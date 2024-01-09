const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const sts = require("http-status-codes");

router.get("/api/getAllUser", async (req, resp) => {
  try {
    const data = await userModel.find({});
    if (data.length) {
      resp.status(200).json({ success: true, data: data, msg: "users found" });
    } else {
      resp
        .status(200)
        .json({ success: false, data: data, msg: "users not found" });
    }
  } catch (err) {
    resp.status(404).json({ success: false, msg: err.message });
  }
});

router.post("/api/getUser", async (req, resp) => {
  try {
    const data = await userModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (data) {
      resp.status(200).json({ success: true, data: data, msg: "user found" });
    } else {
      resp
        .status(200)
        .json({ success: false, data: data, msg: "user not found" });
    }
  } catch (err) {
    resp.status(404).json({ success: false, msg: err.message });
  }
});
router.post("/api/createUser", async (req, resp) => {
  try {
    const data = new userModel({
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });
    const result = data.save();

    resp.status(200).json({ success: true, msg: "user created" });
  } catch (err) {
    resp.status(404).json({ success: false, msg: err.message });
  }
});

module.exports = router;
