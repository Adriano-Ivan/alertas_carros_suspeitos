const retornarOverview = require("../helpers/retornarOverview");
const relatorioHome = require("../models/Relatorio_home");
const fileSystem = require("fs");

exports.getHome = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  Promise.resolve(req.user).then((resu) => {
    relatorioHome
      .executarQueryDoRelatorio(resu[0].id_zona)
      .then((queryRelatorio) => {
        // A função está na pasta HELPERS
        retornarOverview(req, res, queryRelatorio);
      });
  });
};
