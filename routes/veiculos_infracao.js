const controllerVeiculosInfracao = require("./../controllers/veiculos_infracao");
module.exports = (app) => {
  app.get("/veiculos_infracao", controllerVeiculosInfracao.getVeiculosInfracao);
  app.get(
    "/veiculos_infracao/:placa",
    controllerVeiculosInfracao.getVeiculosInfracaoPorPlaca
  );
  app.post(
    "/veiculos_infracao",
    controllerVeiculosInfracao.postVeiculosInfracao
  );
};
