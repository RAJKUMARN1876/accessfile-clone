const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const commentSchema = new mongoose.Schema({
  comment: String,
  timestamp: { type: Date, default: Date.now },
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  files: [fileSchema],
  comments: [commentSchema],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
