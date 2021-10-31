const listaAfazeres = require("../models/lista_afazeres");
const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempUpdateTarefa = fileSystem.readFileSync(
  `${__dirname}/../templates/template-update-tarefa.html`,
  "utf-8"
);
const url = require("url");
const tempAfazeres = fileSystem.readFileSync(
  `${__dirname}/../templates/template-afazeres.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
module.exports = (app) => {
  app.get("/lista_afazeres", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    listaAfazeres.pegarDados().then((listagem) => {
      const retorno = replaceTemplate(
        tempOverview,
        tempAfazeres,
        listagem
        // listaAfazeres.retornoTarefas
      );
      res.end(retorno);
    });
  });
  app.get("/lista_afazeres/:id", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const id = Number.parseInt(req.params.id);
    listaAfazeres.buscarPorId(id, res).then((item) => {
      const retorno = replaceTemplate(tempOverview, tempAfazeres, item);
      res.end(retorno);
    });
  });
  app.post("/lista_afazeres", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const tarefa = req.body;
    console.log(tarefa);

    listaAfazeres
      .adiciona(tarefa)
      .then(() => {
        return listaAfazeres.pegarDados();
      })
      .then((listagem) => {
        const retorno = replaceTemplate(
          tempOverview,
          tempAfazeres,
          listagem
          //listaAfazeres.retornoTarefas
        );
        res.end(retorno);
      })
      .catch((error) => {
        console.log(error);
      });

    //res.send("Você está na rota de /lista_afazeres e está realizando um POST");
  });
  app.get("/update_tarefa/", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const { query } = url.parse(req.url, true);
    //console.log(query);
    const id = parseInt(query["id-registro-tarefa"]);
    const retorno = replaceTemplate(tempOverview, tempUpdateTarefa, id);
    res.end(retorno);
  });
  app.post("/fazer_update", (req, res) => {
    const id = req.body.id_task;
    const updated_task = req.body.updated_task;
    //console.log(id, updated_task);
    listaAfazeres.alterarTarefa(id, updated_task).then(() => {
      res.redirect("/lista_afazeres");
    });
  });
  app.post("/delete_tarefa/", (req, res) => {
    const id = parseInt(req.body["id-registro-tarefa"]);
    listaAfazeres.deletarTarefa(id).then(() => {
      res.redirect("/lista_afazeres");
    });
  });
};
