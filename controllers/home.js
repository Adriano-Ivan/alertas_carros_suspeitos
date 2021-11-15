const retornarOverview = require("../helpers/retornarOverview");
const relatorioHome = require("../models/Relatorio_home");
const fileSystem = require("fs");

exports.getHome = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  relatorioHome.executarQueryDoRelatorio().then((queryRelatorio) => {
    //console.log(queryRelatorio);
    retornarOverview(req, res, queryRelatorio);
  });
};
