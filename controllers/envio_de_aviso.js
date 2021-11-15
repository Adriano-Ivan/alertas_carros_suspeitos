const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getEnvioDeAvisos = (req, res) => {
  res.render("template-envio-aviso", {
    BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
    ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
    porta: process.env.PORT,
  });
};
exports.postEnvioDeAvisos = (req, res) => {
  // res.writeHead(200, { "Content-type": "text/html" });
  // const retorno = replaceTemplate(tempOverview, tempEnvioAviso);
  // res.end(retorno);
};
