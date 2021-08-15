const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    file: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
