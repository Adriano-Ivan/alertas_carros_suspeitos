const listaObservacoes = require("../models/Lista_observacoes");
const url = require("url");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getObservacoesPertinentes = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  Promise.resolve(req.user).then((resu) => {
    listaObservacoes.pegarDados().then((listagem) => {
      const dados = listagem.map((item, i) => {
        item["index"] = i + 1;
        return item;
      });
      console.log(dados);
      res.render("template-observacoes", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        usuario_adm: resu[0].autoridade === "ADM",
        id_zona: resu[0].id_zona,
        listagem_eh_valida: listagem.length > 0,
        listagem: dados,
        porta: process.env.PORT,
      });
    });
  });
};
exports.getObservacaoPorDescricao = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  const descricao = req.params.descricao;
  console.log(descricao);
  Promise.resolve(req.user).then((resu) => {
    listaObservacoes.buscarPorDescricao(descricao).then((listagem) => {
      const dados = listagem.map((item, i) => {
        item["index"] = i + 1;
        return item;
      });
      console.log(dados);
      res.render("template-observacoes", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        usuario_adm: resu[0].autoridade === "ADM",
        id_zona: resu[0].id_zona,
        listagem_eh_valida: dados.length > 0,
        listagem: dados,
        porta: process.env.PORT,
      });
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
  Promise.resolve(req.user).then((resu) => {
    res.render("template-update-observacao", {
      id,
      usuario_adm: resu[0].autoridade === "ADM",
      id_zona: resu[0].id_zona,
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      porta: process.env.PORT,
    });
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
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      const id = parseInt(req.body["id-registro-observacao"]);
      listaObservacoes.deletarObservacao(id).then(() => {
        res.redirect("/observacoes_pertinentes");
      });
    }
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
