const controllerVeiculosRoubados = require("./../../controllers/veiculos_roubados");

module.exports = (app) => {
  app.get("/veiculos_roubados", controllerVeiculosRoubados.getVeiculosRoubados);
  app.get(
    "/veiculos_roubados/:placa",
    controllerVeiculosRoubados.getVeiculosRoubadosPorPlaca
  );
  app.get("/adicionar_roubado", controllerVeiculosRoubados.getAdicionarVeiculo);
  app.post("/insert_roubado", controllerVeiculosRoubados.postAdicionarRoubado);
  app.get(
    "/update_r_roubado_page",
    controllerVeiculosRoubados.getUpdateVeiculo
  );
  app.post("/update_roubado", controllerVeiculosRoubados.postUpdateVeiculo);
};
