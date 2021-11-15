const controllerLocais = require("./../../controllers/locais");
module.exports = (app) => {
  app.get("/locais", controllerLocais.getLocais);
  app.get("/locais/:local", controllerLocais.getLocaisPorDescricao);
};
