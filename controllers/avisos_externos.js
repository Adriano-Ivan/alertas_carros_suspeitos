const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const rotaBootstrapCSS = require("./../modules/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getAvisosExternos = (req, res) => {
  res.render("template-avisos-externos", {
    BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
    ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
  });
};
exports.postAvisosExternos = (req, res) => {
  // res.writeHead(200, { "Content-type": "text/html" });
  // const retorno = replaceTemplate(tempOverview, tempAvisosExternos);
  // res.end(retorno);
};
