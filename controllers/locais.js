const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempLocais = fileSystem.readFileSync(
  `${__dirname}/../templates/template-locais.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.mustache`,
  "utf-8"
);
exports.getLocais = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempLocais);
  res.status(200).end(retorno);
};
