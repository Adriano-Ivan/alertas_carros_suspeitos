const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const listaVeiculosRoubados = require("../models/Veiculos_roubados");
/*const tempRoubados = fileSystem.readFileSync(
  `${__dirname}/../templates/template-roubados.html`,
  "utf-8"
);*/
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.mustache`,
  "utf-8"
);
const rotaBootstrapCSS = require("./../modules/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
exports.getVeiculosRoubados = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  listaVeiculosRoubados.pegarDados().then((listagem) => {
    //const retorno = replaceTemplate(tempOverview, tempRoubados, listagem);
    //console.log(listagem);
    res.render("template-roubados", {
      BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
      ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
    });
  });
};

exports.getVeiculosRoubadosPorPlaca = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const placa = req.params.placa;
  listaVeiculosRoubados.buscarPorPlaca(placa).then((item) => {
    // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
    // res.status(200).end(retorno);
    res.render("template-roubados");
  });
};
exports.postVeiculosRoubados = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS ROUBADOS");
};
