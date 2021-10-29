const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempLocais = fileSystem.readFileSync(
  `${__dirname}/../templates/template-locais.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);

module.exports = (app) => {
  app.get("/locais", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempLocais);
    res.end(retorno);
  });
};
