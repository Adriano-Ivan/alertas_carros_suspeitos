const controllerAfazeres = require("./../controllers/lista_afazeres");
module.exports = (app) => {
  app.get("/lista_afazeres", controllerAfazeres.getAfazeres);
  app.get(
    "/lista_afazeres/:descricao",
    controllerAfazeres.getAfazeresPorDescricao
  );
  app.post("/lista_afazeres", controllerAfazeres.postAfazeres);
  app.get("/update_tarefa", controllerAfazeres.updateAfazer);
  app.post("/fazer_update", controllerAfazeres.fazerUpdate);
  app.post("/delete_tarefa", controllerAfazeres.deletarTarefa);
};
