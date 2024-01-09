const express = require("express");
const router = express.Router();
const chatModel = require("../model/chatModel");
const sts = require("http-status-codes");

router.get("/api/getChat", async (req, resp) => {
  try {
    const data = await chatModel.find({});
    resp.status(200).json({ success: true, data: data, msg: "chats found" });
  } catch (err) {
    resp.status(404).json({ success: true, msg: err.message });
  }
});
// router.post("/api/postChat", async (req, resp) => {
//   try {
//     const data = new chatModel({
//       user: req.body.username,
//       message: req.body.message,
//       userId: req.body.id,
//     });
//     const result = await data.save();
//     resp
//       .status(200)
//       .json({ success: true, data: result, msg: "message saved" });
//   } catch (err) {
//     resp.status(404).json({ success: true, msg: err.message });
//   }
// });

module.exports = router;
