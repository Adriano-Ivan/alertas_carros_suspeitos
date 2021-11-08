const controllerRaiz = require("../controllers/raiz");
module.exports = (app) => {
  app.get("/", controllerRaiz.getHome);
};
