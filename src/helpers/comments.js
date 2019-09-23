const { Comment, image } = require("../models");
module.exports = {
  async niewest() {
    const comments = await Comment.find()
      .limit(4)
      .sort({ timestamp: -1 });
    for (const comment of comments) {
      const img = await image.findOne({ _id: comment.image_id });
      comment.img = img;
    }
    return comments;
  }
};
