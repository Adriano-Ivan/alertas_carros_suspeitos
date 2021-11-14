const retornarOverview = require("../modules/retornarOverview");
const fileSystem = require("fs");
const relatorioHome = require("../models/Relatorio_home");

exports.getHome = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  relatorioHome.executarQueryDoRelatorio().then((queryRelatorio) => {
    //console.log(queryRelatorio);
    retornarOverview(req, res, queryRelatorio);
  });
};
