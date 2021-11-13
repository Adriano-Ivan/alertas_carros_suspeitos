const controllerVeiculosRoubados = require("./../../controllers/veiculos_roubados");

module.exports = (app) => {
  app.get("/veiculos_roubados", controllerVeiculosRoubados.getVeiculosRoubados);
  app.get(
    "/veiculos_roubados/:placa",
    controllerVeiculosRoubados.getVeiculosRoubadosPorPlaca
  );
  app.post(
    "/veicuos_roubados",
    controllerVeiculosRoubados.postVeiculosRoubados
  );
};
