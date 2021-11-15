const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const locais = require("./../models/Locais");
exports.getLocais = (req, res) => {
  locais.pegarDados().then((listagem) => {
    const dados = listagem.map((item, index) => {
      item["index"] = index;
      return item;
    });
    console.log(dados);
    res.render("template-locais", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      porta: process.env.PORT,
      locais_validos: dados.length > 0,
      listagem: dados,
    });
  });
};
exports.getLocaisPorDescricao = (req, res) => {
  const local = req.params.local;
  locais.buscarPorDescricao(local).then((listagem) => {
    const dados = listagem.map((item, index) => {
      item["index"] = index + 1;
      return item;
    });
    console.log(dados);
    res.render("template-locais", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      porta: process.env.PORT,
      locais_validos: dados.length > 0,
      listagem: dados,
    });
  });
};
