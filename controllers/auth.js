const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();

exports.getLogin = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  //res.end(tempLogin);
  if (req.isAuthenticated()) res.redirect("/");
  if (req.query.fail) {
    res.render("login", {
      mensagem: "Por favor, verifique os campos novamente",
      porta: process.env.PORT,
    });
  } else {
    res.render("login", {
      porta: process.env.PORT,
    });
  }
};
