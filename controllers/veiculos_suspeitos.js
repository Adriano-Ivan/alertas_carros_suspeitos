const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const listaVeiculosSuspeitos = require("../models/veiculosSuspeitos");
const tempSuspeitos = fileSystem.readFileSync(
  `${__dirname}/../templates/template-suspeitos.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
// const data = fileSystem.readFileSync(`${__dirname}/../JSON/data.json`, "utf-8");
//const dataObject = JSON.parse(data);

module.exports = (app) => {
  app.get("/veiculos_suspeitos", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    listaVeiculosSuspeitos.pegarDados().then((listagem) => {
      const retorno = replaceTemplate(tempOverview, tempSuspeitos, listagem);
      //console.log(listagem);
      res.end(retorno);
    });
  });
  app.get("/veiculos_suspeitos/:placa", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const placa = req.params.placa;
    listaVeiculosSuspeitos.buscarPorPlaca(placa).then((item) => {
      const retorno = replaceTemplate(tempOverview, tempSuspeitos, item);
      res.end(retorno);
    });
  });
  app.post("/veiculos_roubados", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("ROTA POST DE VEÍCULOS ROUBADOS");
  });
};
