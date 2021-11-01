const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const listaVeiculosIrregulares = require("../models/veiculosIrregulares");
const tempIrregulares = fileSystem.readFileSync(
  `${__dirname}/../templates/template-irregulares.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
// const data = fileSystem.readFileSync(`${__dirname}/../JSON/data.json`, "utf-8");
// const dataObject = JSON.parse(data);
module.exports = (app) => {
  app.get("/veiculos_irregulares", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    listaVeiculosIrregulares.pegarDados().then((listagem) => {
      const retorno = replaceTemplate(tempOverview, tempIrregulares, listagem);
      res.end(retorno);
    });
  });
  app.get("/veiculos_irregulares/:placa", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    listaVeiculosIrregulares.buscarPorPlaca(placa).then((item) => {
      const retorno = replaceTemplate(tempOverview, tempIrregulares, item);
      res.end(retorno);
    });
  });
  app.post("/veiculos_irregulares", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("ROTA POST DE VEÍCULOS EM SITUAÇÃO IRREGULAR");
  });
};
