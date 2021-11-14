const retornarOverview = require("../modules/retornarOverview");
const relatorioHome = require("../models/Relatorio_home");
const fileSystem = require("fs");
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.mustache`,
  "utf-8"
);

exports.getHome = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  relatorioHome.executarQueryDoRelatorio().then((queryRelatorio) => {
    //console.log(queryRelatorio);
    retornarOverview(req, res, tempOverview, queryRelatorio);
  });
};
