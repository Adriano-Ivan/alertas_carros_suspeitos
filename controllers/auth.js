const fileSystem = require("fs");
const tempLogin = fileSystem.readFileSync(
  `${__dirname}/../templates/login.html`,
  "utf-8"
);
const usuarios = require("../models/Usuario");
const AES = require("mysql-aes-binary");
const decrypt = function (text) {
  return AES.decrypt(text, "chave_node");
};
exports.getLogin = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(tempLogin);
};

exports.processarLogin = (req, res) => {
  const senha = req.body.password;
  const email = req.body.email_nome;
  console.log(senha, email);
  usuarios.buscarPorEmailOuNomeESenha(email).then((resultado) => {
    // console.log(resultado);
    // console.log(decrypt(resultado[0].senha));
    if (senha === decrypt(resultado[0].senha) && email === resultado[0].email) {
      res.redirect("/");
    }
  });
};
