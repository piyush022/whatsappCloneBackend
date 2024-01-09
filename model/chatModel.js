const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chatSchema = schema(
  {
    user: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
    useremail: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const model = mongoose.model("chats", chatSchema);

module.exports = model;
