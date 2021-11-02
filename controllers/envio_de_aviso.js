const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempEnvioAviso = fileSystem.readFileSync(
  `${__dirname}/../templates/template-envio-aviso.html`,
  "utf-8"
);

const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);

module.exports = (app) => {
  app.get("/envio_de_aviso", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempEnvioAviso);
    res.status(200).end(retorno);
  });
  app.post("/envio_de_aviso", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempEnvioAviso);
    res.end(retorno);
  });
};
