const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempAvisosExternos = fileSystem.readFileSync(
  `${__dirname}/../templates/template-avisos-externos.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.mustache`,
  "utf-8"
);

exports.getAvisosExternos = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempAvisosExternos);
  res.status(200).end(retorno);
};
exports.postAvisosExternos = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempAvisosExternos);
  res.end(retorno);
};
