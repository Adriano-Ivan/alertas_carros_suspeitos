const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const zonas = require("./../models/Zonas");

const url = require("url");
exports.getZonas = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      zonas.pegarDados().then((listagem) => {
        const dados = listagem.map((item, index) => {
          item["index"] = index + 1;
          return item;
        });
        console.log(dados);
        res.render("template-zonas", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          porta: process.env.PORT,
          usuario_adm: resu[0].autoridade === "ADM",
          id_zona: resu[0].id_zona,
          id_usuario_ref: resu[0].id,
          zonas_validas: dados.length > 0,
          listagem: dados,
          erro_zona: req.flash("erro"),
          sucesso: req.flash("sucesso"),
        });
      });
    }
  });
};
exports.getZonasPorDescricao = (req, res) => {
  const local = req.params.local;
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      zonas.buscarPorDescricao(local).then((listagem) => {
        const dados = listagem.map((item, index) => {
          item["index"] = index + 1;
          return item;
        });
        console.log(dados);
        res.render("template-zonas", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          porta: process.env.PORT,
          usuario_adm: resu[0].autoridade === "ADM",
          id_usuario_ref: resu[0].id,
          id_zona: resu[0].id_zona,
          zonas_validas: dados.length > 0,
          listagem: dados,
        });
      });
    }
  });
};
exports.getAdicionarZona = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      console.log(resu);
      console.log();
      res.render("template-zona-insert", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        usuario_adm: resu[0].autoridade === "ADM",
        id_usuario_ref: resu[0].id,
        id_zona: resu[0].id_zona,
        porta: process.env.PORT,

        sucesso: req.flash("sucesso"),
      });
    }
  });
};
exports.postAdicionarZona = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      console.log(req.body);
      zonas
        .inserirRegistro(req.body)
        .then(() => {
          req.flash("sucesso", true);
          res.redirect("/adicionar_zona");
        })
        .catch((erro) => {
          console.log(erro);
          req.flash("erro", true);
          res.redirect("/adicionar_zona");
        });
    }
  });
};
exports.getUpdateZona = (req, res) => {
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-zona"]);
  console.log(id);
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      console.log("ENTROU");
      console.log(id);
      zonas.pegarDadosPorId(id).then((listagem) => {
        res.render("template-zona-update", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          usuario_adm: resu[0].autoridade === "ADM",
          id_zona: resu[0].id_zona,
          id_usuario_ref: resu[0].id,
          porta: process.env.PORT,
          id_registro: id,
          listagem_eh_valida: listagem.length > 0,
          listagem,
        });
      });
    }
  });
};
exports.postUpdateZona = (req, res) => {
  console.log("ROTA UPDATE zona\n", req.body);
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      const id_registro = parseInt(req.body["id-registro-zona"]);
      const objeto = { zona: req.body.zona };
      zonas
        .updateRegistro(objeto, id_registro)
        .then(() => {
          req.flash("sucesso", true);
          res.redirect("/zonas");
        })
        .catch((erro) => {
          console.log(erro);
          req.flash("erro", true);
          res.redirect("/zonas");
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
      zonas
        .deletarRegistro(parseInt(req.body["id-registro-zona"]))
        .then(() => {
          req.flash("sucesso", true);
          res.redirect("/zonas");
        })
        .catch((erro) => {
          console.log(erro);
          req.flash("erro", true);
          res.redirect("/zonas");
        });
    }
  });
};
