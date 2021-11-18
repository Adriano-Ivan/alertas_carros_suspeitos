const controllerVeiculosInfracao = require("./../../controllers/veiculos_infracao");
module.exports = (app) => {
  app.get("/veiculos_infracao", controllerVeiculosInfracao.getVeiculosInfracao);
  app.get(
    "/veiculos_infracao/:placa",
    controllerVeiculosInfracao.getVeiculosInfracaoPorPlaca
  );

  app.get(
    "/adicionar_infracao",
    controllerVeiculosInfracao.getAdicionarVeiculo
  );
  app.post(
    "/insert_infracao",
    controllerVeiculosInfracao.postAdicionarInfracao
  );
  app.get(
    "/update_r_infracao_page",
    controllerVeiculosInfracao.getUpdateVeiculo
  );
  app.post("/update_infracao", controllerVeiculosInfracao.postUpdateVeiculo);
  app.post("/delete_r_infracao", controllerVeiculosInfracao.deletarRegistro);
};
