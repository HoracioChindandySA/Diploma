const { Comment, image } = require("../models");

async function imageCounter() {
  return await image.countDocuments();
}

async function commentCounter() {
  return await Comment.countDocuments();
}
async function imgTotalViewsCounter() {
  const result = await image.aggregate([
    {
      $group: {
        _id: "1",
        viewsTotal: { $sum: "$views" }
      }
    }
  ]);
  return result[0].viewsTotal;
}
async function likesTotalCounter() {
  const result = await image.aggregate([
    {
      $group: {
        _id: "1",
        likesTotal: { $sum: "$likes" }
      }
    }
  ]);
  return result[0].likesTotal;
}
module.exports = async () => {
  const results = await Promise.all([
    imageCounter(),
    commentCounter(),
    imgTotalViewsCounter(),
    likesTotalCounter()
  ]);
  console.log(results);
  return {
    images: results[0],
    comment: results[1],
    views: results[2],
    likes: results[3]
  };
};
