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

// exports.processarLogin = (req, res) => {
//   const senha = req.body.password;
//   const emailOuNome = req.body.email_nome;
//   console.log(senha, emailOuNome);
//   usuarios
//     .buscarPorEmailOuNomeESenha(senha, emailOuNome)
//     .then((resultado) => {
//       // console.log(resultado);
//       // console.log(decrypt(resultado[0].senha));
//       if (
//         (senha === resultado[0].senha_de &&
//           emailOuNome === resultado[0].email) ||
//         emailOuNome === resultado[0].nome
//       ) {
//         res.redirect("/");
//       }
//     })
//     .catch((erro) => console.log(erro));
// };
