const listaAfazeres = require("../models/Lista_afazeres");
const url = require("url");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getAfazeres = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  listaAfazeres.pegarDados().then((listagem) => {
    const dados = listagem.map((item, i) => {
      item["index"] = i + 1;
      return item;
    });
    console.log(dados);
    res.render("template-afazeres", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem: dados,
      porta: process.env.PORT,
    });
  });
};
exports.getAfazeresPorDescricao = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  const descricao = req.params.descricao;
  listaAfazeres.buscarPorDescricao(descricao, res).then((listagem) => {
    const dados = listagem.map((item, i) => {
      item["index"] = i + 1;
      return item;
    });
    console.log(dados);
    res.render("template-afazeres", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem: dados,
      porta: process.env.PORT,
    });
  });
};
exports.postAfazeres = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  const tarefa = req.body;
  console.log(tarefa);

  listaAfazeres
    .adiciona(tarefa)
    .then(() => {
      res.redirect("/lista_afazeres");
    })
    .catch((error) => {
      console.log(error);
    });

  //res.send("Você está na rota de /lista_afazeres e está realizando um POST");
};
exports.updateAfazer = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
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
    console.log("ENTROU");
    console.log(id);
    res.redirect("/lista_afazeres");
  });
};
