const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempEnvioAviso = fileSystem.readFileSync(
  `${__dirname}/../templates/template-envio-aviso.html`,
  "utf-8"
);

const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.mustache`,
  "utf-8"
);

exports.getEnvioDeAvisos = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempEnvioAviso);
  res.status(200).end(retorno);
};
exports.postEnvioDeAvisos = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempEnvioAviso);
  res.end(retorno);
};
