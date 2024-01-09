const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema(
  {
    username: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const model = mongoose.model("users", userSchema);

module.exports = model;
