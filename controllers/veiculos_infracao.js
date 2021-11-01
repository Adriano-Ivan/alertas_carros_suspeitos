const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempInfracao = fileSystem.readFileSync(
  `${__dirname}/../templates/template-infracao.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
const data = fileSystem.readFileSync(`${__dirname}/../JSON/data.json`, "utf-8");
const dataObject = JSON.parse(data);
module.exports = (app) => {
  app.get("/veiculos_infracao", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempInfracao, dataObject);
    res.end(retorno);
  });
  app.post("/veiculos_infracao", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("ROTA POST DE VEÍCULOS COM INFRAÇÃO");
  });
};
