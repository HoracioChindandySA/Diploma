const mongoose = require("mongoose");
const { database } = require("./keys");
mongoose
  .connect(database.URI, {})
  .then(db => console.log("Db is coneted"))
  .catch(err => console.error(err));
