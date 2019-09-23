const path = require("path");

const { randomNumber } = require("../helpers/libs");
const { image, Comment } = require("../models");
const md5 = require("md5");
const Sidebar = require("../helpers/sidebar");

const fs = require("fs-extra");
const ctrl = {};
ctrl.index = async (req, res) => {
  //console.log({res.params.image_id});
  const img = await image.findOne({
    filename: { $regex: req.params.image_id }
  });
  if (img) {
    img.views = img.views + 1;
    await img.save();

    const comments = await Comment.find({ image_id: img._id });
    const sb = await Sidebar();
    console.log(img);
    res.render("image", { Image: img, comments, sidebar: sb });
  } else {
    res.redirect("/");
  }
};

ctrl.create = (req, res) => {
  const saveImage = async () => {
    const imgUrl = randomNumber();
    // To cheque if the name entered is oready sttored
    const images = await image.find({ filename: imgUrl });
    if (images.length > 0) {
      saveImage();
    } else {
      console.log(imgUrl);
      const imageTempPath = req.file.path;
      console.log(imageTempPath);
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

      if (
        ext === ".png" ||
        ext === ".jpg" ||
        ext === ".jpeg" ||
        ext === ".gif"
      ) {
        await fs.rename(imageTempPath, targetPath);
        const newImage = new image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description
        });
        const imageSaved = await newImage.save();
        console.log(newImage);
        res.redirect("/images/" + imgUrl);
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({ error: "Only images allowed" });
      }
    }
  };
  saveImage();
};
ctrl.like = async (req, res) => {
  const imgLike = await image.findOne({
    filename: { $regex: req.params.image_id }
  });
  if (imgLike) {
    imgLike.likes = imgLike.likes + 1;
    await imgLike.save();
    res.json({ likes: imgLike.likes });
  } else {
    res.status(500).json({ error: "Erro interno" });
  }
};
ctrl.comment = async (req, res) => {
  const img = await image.findOne({
    filename: { $regex: req.params.image_id }
  });
  if (img) {
    const newComment = new Comment(req.body);
    // para fazer o hash do email usando o md5
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = img._id;
    console.log(newComment);
    // Para salvar no db
    await newComment.save();

    res.redirect("/images/" + img.uniqueId);
  } else {
    res.redirect("/");
  }
  //console.log(req.params.image_id);
};

ctrl.remove = async (req, res) => {
  const removeImg = await image.findOne({
    filename: { $regex: req.params.image_id }
  });
  if (removeImg) {
    console.log(removeImg);
    await fs.unlink(path.resolve("./src/public/upload/" + removeImg.filename));
    await Comment.deleteOne({ image_id: removeImg._id });
    await removeImg.remove();
    res.json();
  }
};

module.exports = ctrl;
