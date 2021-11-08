const controllerLocais = require("./../controllers/locais");
module.exports = (app) => {
  app.get("/locais", controllerLocais.getLocais);
};
