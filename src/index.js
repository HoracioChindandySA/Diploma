const express = require("express");
const config = require("./server/config");

//Base de dados
require("./database");

const app = config(express());

// inicializando oservidor
app.listen(app.get("port"), () => {
  console.log("Server is runing on port", app.get("port"));
});
