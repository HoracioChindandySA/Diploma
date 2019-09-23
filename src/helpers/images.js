const { image } = require("../models");
module.exports = {
  async popular() {
    const imag = await image
      .find()
      .limit(8)
      .sort({ likes: -1 });
    return imag;
  }
};
