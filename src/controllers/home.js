const ctrl = {};
const { image } = require("../models");
const sidebar = require("../helpers/sidebar");
ctrl.index = async (req, res) => {
  const images = await image.find().sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel.sidebar = await sidebar();
  console.log(viewModel);

  res.render("index", viewModel);
};
module.exports = ctrl;
