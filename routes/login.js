const controllerLogin = require("../controllers/login");
module.exports = (app) => {
  app.get("/login", controllerLogin.getLogin);
};
