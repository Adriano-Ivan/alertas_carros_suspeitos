const usuario = require("./../models/Usuario");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const url = require("url");

const returnedUpperFirst = function (nm) {
  return nm
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
    .join("");
};
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
          id_usuario_ref: resu[0].id,
          id_zona: resu[0].id_zona,
          nome_deletado: req.flash("usuario"),
          usuario_deletado: req.flash("usuario_deletado"),
          update_proibido: req.flash("update_proibido"),
          delete_proibido: req.flash("delete_proibido"),
          senhas_diferentes: req.flash("senhas_diferentes"),
          email_duplicado: req.flash("email_duplicado"),
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
        id_usuario_ref: resu[0].id,
        id_zona: resu[0].id_zona,
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
    } else {
      let hashedPassword = await bcrypt.hash(senha, 8);
      console.log(hashedPassword);
      usuario
        .inserirRegistro({
          nome: returnedUpperFirst(name),
          senha: hashedPassword,
          email: email,
          autoridade: autoridade,
        })
        .then(() => {
          req.flash("sucesso_add_user", true);
          req.flash("nome_usuario", returnedUpperFirst(name));
          res.redirect("/adicionar_usuario");
        })
        .catch((erro) => console.log(erro));
    }
  });
};
exports.getUpdateUsuario = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      const { query } = url.parse(req.url, true);
      const id = parseInt(query["id-registro-usuario"]);
      //console.log("ENTROUUUUUUUU");
      //console.log(id);
      usuario.findUserById(id).then((user) => {
        if (user[0].autoridade === "ADM") {
          req.flash("update_proibido", true);
          res.redirect("/usuarios");
        } else {
          res.render("template-usuarios-update", {
            user,
            porta: process.env.PORT,
            id_registro: id,
            usuario_adm: resu[0].autoridade === "ADM",
            id_usuario_ref: resu[0].id,
            id_zona: resu[0].id_zona,
            BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
            ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          });
        }
      });
    }
  });
};
exports.postUpdateUsuario = (req, res) => {
  Promise.resolve(req.user).then((result) => {
    if (!(result[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      const email = req.body.email;
      const senha = req.body.senha_inserida;
      const senhaConfirmacao = req.body.senha_confirmacao;
      usuario.avaliarEmail(email).then(async (resultado) => {
        if (resultado.length > 0) {
          console.log("email duplicado");
          console.log(resultado);
          req.flash("email_duplicado", true);
          res.redirect("/usuarios");
        } else if (senha !== senhaConfirmacao) {
          req.flash("senhas_diferentes", true);
          res.redirect("/usuarios");
        } else {
          console.log("OPA");
          let hashedPassword = await bcrypt.hash(senha, 8);
          console.log(hashedPassword);
          const objeto = {
            nome: req.body.usuario,
            email,
            senha: hashedPassword,
            autoridade: req.body.autoridade,
          };
          const id_registro = parseInt(req.body["id-registro-usuario"]);
          usuario
            .updateRegistro(objeto, id_registro)
            .then(() => {
              req.flash("update_feito", true);
              res.redirect("/usuarios");
            })
            .catch((erro) => console.log(erro));
        }
      });
    }
  });
};
exports.deletarRegistro = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      usuario
        .findUserById(parseInt(req.body["id-registro-usuario"]))
        .then((user) => {
          if (user[0].autoridade === "ADM") {
            req.flash("delete_proibido", true);
            res.redirect("/usuarios");
          } else {
            usuario
              .deleteUserById(parseInt(req.body["id-registro-usuario"]))
              .then((user) => {
                req.flash("usuario", user[0].nome);
                req.flash("usuario_deletado", true);
                res.redirect("/usuarios");
              })
              .catch((erro) => {
                console.log(erro);
              });
          }
        });
    }
  });
};
