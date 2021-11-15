const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
exports.getLocais = (req, res) => {
  res.render("template-locais", {
    BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
    ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
    porta: process.env.PORT,
  });
};
