const controllerAuth = require("../controllers/auth");
module.exports = (app) => {
  app.get("/login", controllerAuth.getLogin);
  app.post("/auth/login", controllerAuth.processarLogin);
};
