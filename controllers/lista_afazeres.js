const listaAfazeres = require("../models/Lista_afazeres");
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
exports.getAfazeres = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  listaAfazeres.pegarDados().then((listagem) => {
    const retorno = replaceTemplate(
      tempOverview,
      tempAfazeres,
      listagem
      // listaAfazeres.retornoTarefas
    );
    res.status(200).end(retorno);
  });
};
exports.getAfazeresPorDescricao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const descricao = req.params.descricao;
  listaAfazeres.buscarPorDescricao(descricao, res).then((item) => {
    const retorno = replaceTemplate(tempOverview, tempAfazeres, item);
    res.status(200).end(retorno);
  });
};
exports.postAfazeres = (req, res) => {
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
};
exports.updateAfazer = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-tarefa"]);
  const retorno = replaceTemplate(tempOverview, tempUpdateTarefa, id);
  res.status(200).end(retorno);
};
exports.fazerUpdate = (req, res) => {
  const id = req.body.id_task;
  const updated_task = req.body.updated_task;
  //console.log(id, updated_task);
  listaAfazeres.alterarTarefa(id, updated_task).then(() => {
    res.redirect("/lista_afazeres");
  });
};
exports.deletarTarefa = (req, res) => {
  const id = parseInt(req.body["id-registro-tarefa"]);
  listaAfazeres.deletarTarefa(id).then(() => {
    res.redirect("/lista_afazeres");
  });
};
