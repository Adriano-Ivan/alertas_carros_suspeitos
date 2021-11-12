const controllerAuth = require("../controllers/auth");
const passport = require("passport");
module.exports = (app) => {
  app.get("/login", controllerAuth.getLogin);
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/login",
    })
  );
};
