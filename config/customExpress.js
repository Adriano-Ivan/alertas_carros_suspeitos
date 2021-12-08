const express = require("express");
const consign = require("consign");
let http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const usuario = require("./../models/Usuario");
const mustache = require("mustache-express");
const path = require("path");
const flash = require("connect-flash");
require("../helpers/Passport").processarAutenticacao(passport, usuario);
const loginRouter = require("./../routes/auth");

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
/*const methodOverride = require("method-override");*/
const cors = require("cors");
module.exports = () => {
  const app = express();
  app.set("view engine", "mustache");
  app.set("views", path.join(__dirname, "../views"));
  app.engine("mustache", mustache());
  app.use(cors());
  app.use(flash());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  //app.use(methodOverride("_method"));

  app.use(
    session({
      secret: process.env.SECRET_S,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 60 * 1000 },
    })
  );
  app.use("/public", express.static(path.join(__dirname + `/../public`)));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/login", loginRouter);
  app.use(authenticationMiddleware);
  consign().include("routes/private").into(app);

  app.use((req, res) => {
    res
      .status(404)
      .send(
        "<strong sytle='font-size:35px;text-transform:uppercase'>Página não encontrada</strong>"
      );
  });
  http = http.createServer(app);
  return http;
};
