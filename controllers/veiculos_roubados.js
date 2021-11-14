const listaVeiculosRoubados = require("../models/Veiculos_roubados");
const rotaBootstrapCSS = require("./../modules/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getVeiculosRoubados = (req, res) => {
  listaVeiculosRoubados.pegarDados().then((listagem) => {
    //console.log(listagem);
    res.render("template-roubados", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem,
    });
  });
};

exports.getVeiculosRoubadosPorPlaca = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  const placa = req.params.placa;
  listaVeiculosRoubados.buscarPorPlaca(placa).then((listagem) => {
    // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
    // res.status(200).end(retorno);

    res.render("template-roubados", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      listagem_eh_valida: listagem.length > 0,
      listagem,
    });
  });
};
exports.postVeiculosRoubados = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS ROUBADOS");
};
