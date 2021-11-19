const controllerLocais = require("./../../controllers/locais");
module.exports = (app) => {
  app.get("/locais", controllerLocais.getLocais);
  app.get("/locais/:local", controllerLocais.getLocaisPorDescricao);
  app.get("/adicionar_local", controllerLocais.getAdicionarLocal);
  app.get("/update_r_local_page", controllerLocais.getUpdateLocal);
  app.post("/insert_local", controllerLocais.postAdicionarLocal);
  app.post("/update_local", controllerLocais.postUpdateLocal);
  app.post("/delete_r_local", controllerLocais.deletarRegistro);
};
