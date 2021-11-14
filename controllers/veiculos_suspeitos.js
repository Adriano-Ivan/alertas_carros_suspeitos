const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const listaVeiculosSuspeitos = require("../models/Veiculos_suspeitos");
const tempSuspeitos = fileSystem.readFileSync(
  `${__dirname}/../templates/template-suspeitos.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.mustache`,
  "utf-8"
);
exports.getVeiculosSuspeitos = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  listaVeiculosSuspeitos.pegarDados().then((listagem) => {
    const retorno = replaceTemplate(tempOverview, tempSuspeitos, listagem);
    //console.log(listagem);
    res.end(retorno);
  });
};
exports.getVeiculosSuspeitosPorPlaca = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const placa = req.params.placa;
  listaVeiculosSuspeitos.buscarPorPlaca(placa).then((item) => {
    const retorno = replaceTemplate(tempOverview, tempSuspeitos, item);
    res.end(retorno);
  });
};
exports.postVeiculosSuspeitos = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("ROTA POST DE VEÍCULOS ROUBADOS");
};
