const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const listaVeiculosInfracao = require("../models/Veiculos_infracao");
const tempInfracao = fileSystem.readFileSync(
  `${__dirname}/../templates/template-infracao.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
exports.getVeiculosInfracao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  listaVeiculosInfracao.pegarDados().then((listagem) => {
    const retorno = replaceTemplate(tempOverview, tempInfracao, listagem);
    //console.log(listagem);
    res.status(200).end(retorno);
  });
};
exports.getVeiculosInfracaoPorPlaca = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const placa = req.params.placa;
  listaVeiculosInfracao.buscarPorPlaca(placa).then((item) => {
    const retorno = replaceTemplate(tempOverview, tempInfracao, item);
    res.status(200).end(retorno);
  });
};
exports.postVeiculosInfracao = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS COM INFRAÇÃO");
};
