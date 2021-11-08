const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
module.exports = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride("_method"));

  consign().include("routes").into(app);

  app.use("/public", express.static(__dirname + `/../public`));

  app.use((req, res) => {
    res
      .status(404)
      .send("<strong sytle='font-size:25px'>Página não encontrada</strong>");
  });
  return app;
};
