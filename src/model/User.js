const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  publicKey: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
    required: true,
  },
});

module.exports = mongoose.model("UserDBCard", UserSchema);
