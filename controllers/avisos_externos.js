const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempAvisosExternos = fileSystem.readFileSync(
  `${__dirname}/../templates/template-avisos-externos.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);

module.exports = (app) => {
  app.get("/avisos_externos", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempAvisosExternos);
    res.end(retorno);
  });
  app.post("/avisos_externos", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempAvisosExternos);
    res.end(retorno);
  });
};
