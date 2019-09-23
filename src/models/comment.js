//const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;
//const ObjectId=Schema.ObjectId;
const commentSchema = new Schema({
  image_id: { type: ObjectId },
  gravatar: { type: String },
  email: { type: String },
  name: { type: String },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now }
});
commentSchema.virtual("image").set(function(image) {
  this._image = image;
  get(function() {
    return this._image;
  });
});

module.exports = model("Comment", commentSchema);
