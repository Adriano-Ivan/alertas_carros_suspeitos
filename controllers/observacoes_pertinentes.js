const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempObservacoes = fileSystem.readFileSync(
  `${__dirname}/../templates/template-observacoes.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
module.exports = (app) => {
  app.get("/observacoes_pertinentes", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    const retorno = replaceTemplate(tempOverview, tempObservacoes);
    res.end(retorno);
  });
  app.post("/observacoes_pertinentes", (req, res) => {
    res.send(
      "Você está na rota de /observacoes_pertinentes e está realizando um POST"
    );
  });
};
