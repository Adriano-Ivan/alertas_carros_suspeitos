const listaVeiculosIrregulares = require("../models/Veiculos_irregulares");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
exports.getVeiculosIrregulares = (req, res) => {
  listaVeiculosIrregulares.pegarDados().then((listagem) => {
    //console.log(listagem);
    res.render("template-irregulares", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem,
      porta: process.env.PORT,
    });
  });
};
exports.getVeiculosIrregularesPorPlaca = (req, res) => {
  const placa = req.params.placa;
  listaVeiculosIrregulares.buscarPorPlaca(placa).then((listagem) => {
    // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
    // res.status(200).end(retorno);

    res.render("template-irregulares", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem,
      porta: process.env.PORT,
    });
  });
};
exports.postVeiculosIrregulares = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS EM SITUAÇÃO IRREGULAR");
};
