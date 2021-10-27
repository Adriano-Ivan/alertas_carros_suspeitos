const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempIrregulares = fileSystem.readFileSync(
  `${__dirname}/../templates/template-irregulares.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
const data = fileSystem.readFileSync(`${__dirname}/../JSON/data.json`, "utf-8");
const dataObject = JSON.parse(data);
module.exports = (app) => {
  app.get("/veiculos_irregulares", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempIrregulares, dataObject);
    res.end(retorno);
  });
};
