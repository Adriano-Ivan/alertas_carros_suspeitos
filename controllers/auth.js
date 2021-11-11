const fileSystem = require("fs");
const tempLogin = fileSystem.readFileSync(
  `${__dirname}/../templates/login.html`,
  "utf-8"
);
const usuarios = require("../models/Usuario");
const retornarOverview = require("../modules/retornarOverview");
const relatorioHome = require("../models/Relatorio_home");
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);

exports.getLogin = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(tempLogin);
};
exports.processarLogin = (req, res) => {
  const senha = req.body.password;
  const email = req.body.email;
  console.log(senha, email);
  usuarios.buscarPorEmail(req.body.email).then((resultado) => {
    console.log(resultado);
    if (senha === resultado[0].senha && email === resultado[0].email) {
      res.redirect("/");
    }
  });
};
