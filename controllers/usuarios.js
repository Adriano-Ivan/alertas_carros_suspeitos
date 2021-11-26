const usuario = require("./../models/Usuario");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.getUsuarios = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      usuario.getUsuarios().then((listagem) => {
        console.log(listagem);
        res.render("template-usuarios", {
          porta: process.env.PORT,
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          usuario_adm: resu[0].autoridade === "ADM",
          listagem,
          listagem_eh_valida: listagem.length > 0,
        });
      });
    }
  });
};
exports.getAdicionarUsuario = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      res.render("template-usuarios-insert", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        usuario_adm: resu[0].autoridade === "ADM",
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        senhas_diferentes: req.flash("senhas_diferentes"),
        email_duplicado: req.flash("email_duplicado"),
        usuario_adicionado: req.flash("sucesso_add_user"),

        nome_usuario: req.flash("nome_usuario"),
      });
    }
  });
};
exports.postAdicionarUsuario = (req, res) => {
  const name = req.body.usuario;
  const email = req.body.email;
  const autoridade = req.body.autoridade;
  const senha = req.body.senha_inserida;
  const senhaConfirmacao = req.body.senha_confirmacao;

  usuario.avaliarEmail(email).then(async (resultado) => {
    if (resultado.length > 0) {
      console.log("email duplicado");
      console.log(resultado);
      req.flash("email_duplicado", true);
      res.redirect("/adicionar_usuario");
    } else if (senha !== senhaConfirmacao) {
      req.flash("senhas_diferentes", true);
      res.redirect("/adicionar_usuario");
    }

    let hashedPassword = await bcrypt.hash(senha, 8);
    console.log(hashedPassword);
    usuario
      .inserirRegistro({
        nome: name,
        senha: hashedPassword,
        email: email,
        autoridade: autoridade,
      })
      .then(() => {
        req.flash("sucesso_add_user", true);
        req.flash(
          "nome_usuario",
          name
            .split("")
            .map((e, i, arr) => {
              let el = e;
              if (i === 0) {
                el = e.toUpperCase();
              } else if (arr[i - 1] === " ") {
                el = e.toUpperCase();
              } else {
                el = e.toLowerCase();
              }
              return el;
            })
            .join("")
        );
        res.redirect("/adicionar_usuario");
      })
      .catch((erro) => console.log(erro));
  });
};
