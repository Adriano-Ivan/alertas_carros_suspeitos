const listaObservacoes = require("../models/Lista_observacoes");
const url = require("url");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getObservacoesPertinentes = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  listaObservacoes.pegarDados().then((listagem) => {
    const dados = listagem.map((item, i) => {
      item["index"] = i + 1;
      return item;
    });
    console.log(dados);
    res.render("template-observacoes", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem: dados,
      porta: process.env.PORT,
    });
  });
};
exports.getObservacaoPorDescricao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const descricao = req.params.descricao;
  console.log(descricao);
  listaObservacoes.buscarPorDescricao(descricao, res).then((listagem) => {
    const dados = listagem.map((item, i) => {
      item["index"] = i + 1;
      return item;
    });
    console.log(dados);
    res.render("template-observacoes", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem: dados,
      porta: process.env.PORT,
    });
  });
};
exports.postObservacoesPertinentes = (req, res) => {
  const observacao = req.body;
  console.log(observacao);

  listaObservacoes
    .adiciona(observacao)
    .then(() => {
      res.redirect("/observacoes_pertinentes");
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.updateObservacao = (req, res) => {
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-tarefa"]);
  res.render("template-update-tarefa", {
    id,
    BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
    ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
    porta: process.env.PORT,
  });
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
