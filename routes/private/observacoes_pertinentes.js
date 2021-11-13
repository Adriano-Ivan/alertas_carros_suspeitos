const controllerObservacoes = require("./../../controllers/observacoes_pertinentes");
module.exports = (app) => {
  app.get(
    "/observacoes_pertinentes",
    controllerObservacoes.getObservacoesPertinentes
  );
  app.get(
    "/observacoes_pertinentes/:descricao",
    controllerObservacoes.getObservacaoPorDescricao
  );
  app.post(
    "/observacoes_pertinentes",
    controllerObservacoes.postObservacoesPertinentes
  );
  app.get("/update_observacao", controllerObservacoes.updateObservacao);
  app.post(
    "/fazer_update_observation",
    controllerObservacoes.fazerUpdateObservacao
  );
  app.post("/delete_observacao", controllerObservacoes.deletarObservacao);
};
