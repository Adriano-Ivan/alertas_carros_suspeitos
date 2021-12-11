const controllerZonas = require("./../../controllers/zonas");
module.exports = (app) => {
  app.get("/zonas", controllerZonas.getZonas);
  app.get("/zonas/:zona", controllerZonas.getZonasPorDescricao);
  app.get("/adicionar_zona", controllerZonas.getAdicionarZona);
  app.get("/update_r_zona_page", controllerZonas.getUpdateZona);
  app.post("/insert_zona", controllerZonas.postAdicionarZona);
  app.post("/update_zona", controllerZonas.postUpdateZona);
  app.post("/delete_r_zona", controllerZonas.deletarRegistro);
};
