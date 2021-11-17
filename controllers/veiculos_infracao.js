const listaVeiculosInfracao = require("../models/Veiculos_infracao");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
exports.getVeiculosInfracao = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosInfracao.pegarDados().then((listagem) => {
      //console.log(listagem);
      console.log(resu);
      res.render("template-infracao", {
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
exports.getVeiculosInfracaoPorPlaca = (req, res) => {
  const placa = req.params.placa;
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosInfracao.buscarPorPlaca(placa).then((listagem) => {
      // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
      // res.status(200).end(retorno);
      console.log(resu);
      res.render("template-irregulares", {
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
exports.postVeiculosInfracao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS COM INFRAÇÃO");
};
