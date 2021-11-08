const controllerHome = require("../controllers/home");
module.exports = (app) => {
  app.get("/home", controllerHome.getHome);
};
