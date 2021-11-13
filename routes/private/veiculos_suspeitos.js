const controllerVeiculosSuspeitos = require("./../../controllers/veiculos_suspeitos");

module.exports = (app) => {
  app.get(
    "/veiculos_suspeitos",
    controllerVeiculosSuspeitos.getVeiculosSuspeitos
  );
  app.get(
    "/veiculos_suspeitos/:placa",
    controllerVeiculosSuspeitos.getVeiculosSuspeitosPorPlaca
  );
  app.post(
    "/veicuos_suspeitos",
    controllerVeiculosSuspeitos.postVeiculosSuspeitos
  );
};
