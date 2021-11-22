const retornarOverview = require("../helpers/retornarOverview");
const relatorioHome = require("../models/Relatorio_home");

exports.getHome = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  relatorioHome.executarQueryDoRelatorio().then((queryRelatorio) => {
    // A função está na pasta HELPERS
    retornarOverview(req, res, queryRelatorio);
  });
};
