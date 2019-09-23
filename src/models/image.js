const mongoose = require("mongoose");
const path = require("path");
const { Schema } = mongoose;
const imageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});
imageSchema.virtual("uniqueId").get(function() {
  console.log(this.filename);

  return this.filename != null || this.filename != undefined
    ? this.filename.replace(path.extname(this.filename), "")
    : null;
});
module.exports = mongoose.model("image", imageSchema);
