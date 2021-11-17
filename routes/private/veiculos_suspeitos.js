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
  app.get(
    "/adicionar_suspeito",
    controllerVeiculosSuspeitos.getAdicionarVeiculo
  );
  app.post(
    "/insert_suspeito",
    controllerVeiculosSuspeitos.postAdicionarSuspeito
  );
  app.get(
    "/update_r_suspeito_page",
    controllerVeiculosSuspeitos.getUpdateVeiculo
  );
  app.post("/update_suspeito", controllerVeiculosSuspeitos.postUpdateVeiculo);
};
