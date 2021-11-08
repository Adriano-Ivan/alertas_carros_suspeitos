const controllerVeiculosIrregulares = require("./../controllers/veiculos_irregulares");

module.exports = (app) => {
  app.get(
    "/veiculos_irregulares",
    controllerVeiculosIrregulares.getVeiculosIrregulares
  );
  app.get(
    "/veiculos_irregulares/:placa",
    controllerVeiculosIrregulares.getVeiculosIrregularesPorPlaca
  );
  app.post(
    "/veicuos_irregulares",
    controllerVeiculosIrregulares.postVeiculosIrregulares
  );
};
