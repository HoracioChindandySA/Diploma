const Stats = require("./stats");
const Images = require("./images");
const Comments = require("./comments");
module.exports = async () => {
  const results = await Promise.all([
    Stats(),
    Images.popular(),
    Comments.niewest()
  ]);
  const viewModel = {
    status: results[0],
    popular: results[1],
    comments: results[2]
  };
  console.log(viewModel);
  return viewModel;
};
