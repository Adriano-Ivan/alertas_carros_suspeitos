const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const usuario = require("./../models/Usuario");
require("./../models/Passport")(passport, usuario);
/*const methodOverride = require("method-override");*/
const cors = require("cors");
module.exports = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  //app.use(methodOverride("_method"));

  app.use(
    session({
      secret: process.env.SECRET_S,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 2 * 60 * 1000 },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  consign().include("routes").into(app);

  app.use("/public", express.static(__dirname + `/../public`));

  app.use((req, res) => {
    res
      .status(404)
      .send(
        "<strong sytle='font-size:35px;text-transform:uppercase'>Página não encontrada</strong>"
      );
  });
  return app;
};
