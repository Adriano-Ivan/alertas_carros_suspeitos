const listaVeiculosInfracao = require("../models/Veiculos_infracao");
const rotaBootstrapCSS = require("./../modules/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
exports.getVeiculosInfracao = (req, res) => {
  listaVeiculosInfracao.pegarDados().then((listagem) => {
    //console.log(listagem);
    res.render("template-infracao", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem,
    });
  });
};
exports.getVeiculosInfracaoPorPlaca = (req, res) => {
  const placa = req.params.placa;
  listaVeiculosInfracao.buscarPorPlaca(placa).then((listagem) => {
    // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
    // res.status(200).end(retorno);

    res.render("template-irregulares", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem,
    });
  });
};
exports.postVeiculosInfracao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS COM INFRAÇÃO");
};
