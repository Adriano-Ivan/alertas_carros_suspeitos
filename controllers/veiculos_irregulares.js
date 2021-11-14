const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const listaVeiculosIrregulares = require("../models/Veiculos_irregulares");
const tempIrregulares = fileSystem.readFileSync(
  `${__dirname}/../templates/template-irregulares.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.mustache`,
  "utf-8"
);
exports.getVeiculosIrregulares = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  listaVeiculosIrregulares.pegarDados().then((listagem) => {
    const retorno = replaceTemplate(tempOverview, tempIrregulares, listagem);
    res.status(200).end(retorno);
  });
};
exports.getVeiculosIrregularesPorPlaca = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  listaVeiculosIrregulares.buscarPorPlaca(placa).then((item) => {
    const retorno = replaceTemplate(tempOverview, tempIrregulares, item);
    res.status(200).end(retorno);
  });
};
exports.postVeiculosIrregulares = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS EM SITUAÇÃO IRREGULAR");
};
