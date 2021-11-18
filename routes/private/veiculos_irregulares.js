const controllerVeiculosIrregulares = require("./../../controllers/veiculos_irregulares");

module.exports = (app) => {
  app.get(
    "/veiculos_irregulares",
    controllerVeiculosIrregulares.getVeiculosIrregulares
  );
  app.get(
    "/veiculos_irregulares/:placa",
    controllerVeiculosIrregulares.getVeiculosIrregularesPorPlaca
  );
  app.get(
    "/adicionar_irregular",
    controllerVeiculosIrregulares.getAdicionarVeiculo
  );
  app.post(
    "/insert_irregular",
    controllerVeiculosIrregulares.postAdicionarIrregular
  );
  app.get(
    "/update_r_irregular_page",
    controllerVeiculosIrregulares.getUpdateVeiculo
  );
  app.post(
    "/update_irregular",
    controllerVeiculosIrregulares.postUpdateVeiculo
  );
  app.post(
    "/delete_r_irregular",
    controllerVeiculosIrregulares.deletarRegistro
  );
};
