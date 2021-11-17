const listaVeiculosRoubados = require("../models/Veiculos_roubados");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getVeiculosRoubados = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosRoubados.pegarDados().then((listagem) => {
      //console.log(listagem);
      res.render("template-roubados", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
        usuario_adm: resu[0].autoridade === "ADM",
        porta: process.env.PORT,
      });
    });
  });
};

exports.getVeiculosRoubadosPorPlaca = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  const placa = req.params.placa;
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosRoubados.buscarPorPlaca(placa).then((listagem) => {
      // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
      // res.status(200).end(retorno);

      res.render("template-roubados", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
        usuario_adm: resu[0].autoridade === "ADM",
        porta: process.env.PORT,
      });
    });
  });
};
exports.postVeiculosRoubados = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS ROUBADOS");
};
