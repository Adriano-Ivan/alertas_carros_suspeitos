const listaObservacoes = require("../models/Lista_observacoes");
const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const url = require("url");
const tempObservacoes = fileSystem.readFileSync(
  `${__dirname}/../templates/template-observacoes.html`,
  "utf-8"
);
const tempUpdateObservacao = fileSystem.readFileSync(
  `${__dirname}/../templates/template-update-observacao.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
exports.getObservacoesPertinentes = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  listaObservacoes.pegarDados().then((listagem) => {
    const retorno = replaceTemplate(
      tempOverview,
      tempObservacoes,
      listagem
      // listaAfazeres.retornoTarefas
    );
    res.status(200).end(retorno);
  });
};
exports.getObservacaoPorDescricao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const descricao = req.params.descricao;
  console.log(descricao);
  listaObservacoes.buscarPorDescricao(descricao, res).then((item) => {
    const retorno = replaceTemplate(tempOverview, tempObservacoes, item);
    res.status(200).end(retorno);
  });
};
exports.postObservacoesPertinentes = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const observacao = req.body;
  console.log(observacao);
  //console.log(tarefa);

  listaObservacoes
    .adiciona(observacao)
    .then(() => {
      return listaObservacoes.pegarDados();
    })
    .then((listagem) => {
      const retorno = replaceTemplate(
        tempOverview,
        tempObservacoes,
        listagem
        //listaAfazeres.retornoTarefas
      );
      res.end(retorno);
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.updateObservacao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-observacao"]);
  const retorno = replaceTemplate(tempOverview, tempUpdateObservacao, id);
  res.status(200).end(retorno);
};
exports.fazerUpdateObservacao = (req, res) => {
  const id = req.body.id_observation;
  console.log(id);
  const updated_observacao = req.body.updated_observation;
  console.log(updated_observacao);
  //console.log(id, updated_task);
  listaObservacoes.alterarObservacao(id, updated_observacao).then(() => {
    res.redirect("/observacoes_pertinentes");
  });
};
exports.deletarObservacao = (req, res) => {
  const id = parseInt(req.body["id-registro-observacao"]);
  listaObservacoes.deletarObservacao(id).then(() => {
    res.redirect("/observacoes_pertinentes");
  });
};
// module.exports = (app) => {
//   //app.get("/observacoes_pertinentes",);
//   //app.get("/observacoes_pertinentes/:descricao",);
//   //app.post("/observacoes_pertinentes", );
//   //app.get("/update_observacao/",);
//   //app.post("/fazer_update_observation", );
//   //app.post("/delete_observacao/", );
// };
