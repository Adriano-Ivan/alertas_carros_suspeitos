const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const locais = require("./../models/Locais");
const url = require("url");
exports.getLocais = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    locais.pegarDados().then((listagem) => {
      const dados = listagem.map((item, index) => {
        item["index"] = index + 1;
        return item;
      });
      console.log(dados);
      res.render("template-locais", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        porta: process.env.PORT,
        usuario_adm: resu[0].autoridade === "ADM",
        id_zona: resu[0].id_zona,
        id_usuario_ref: resu[0].id,
        locais_validos: dados.length > 0,
        listagem: dados,
        placa_errada: req.flash("erro"),
        sucesso: req.flash("sucesso"),
      });
    });
  });
};
exports.getLocaisPorDescricao = (req, res) => {
  const local = req.params.local;
  Promise.resolve(req.user).then((resu) => {
    locais.buscarPorDescricao(local).then((listagem) => {
      const dados = listagem.map((item, index) => {
        item["index"] = index + 1;
        return item;
      });
      console.log(dados);
      res.render("template-locais", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        porta: process.env.PORT,
        usuario_adm: resu[0].autoridade === "ADM",
        id_usuario_ref: resu[0].id,
        id_zona: resu[0].id_zona,
        locais_validos: dados.length > 0,
        listagem: dados,
      });
    });
  });
};
exports.getAdicionarLocal = (req, res) => {
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
      res.render("template-local-insert", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        usuario_adm: resu[0].autoridade === "ADM",
        id_usuario_ref: resu[0].id,
        id_zona: resu[0].id_zona,
        porta: process.env.PORT,
        placa_errada: req.flash("erro"),
        sucesso: req.flash("sucesso"),
      });
    }
  });
};
exports.postAdicionarLocal = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      console.log(req.body);
      locais
        .inserirRegistro(req.body)
        .then(() => {
          req.flash("sucesso", true);
          res.redirect("/adicionar_local");
        })
        .catch((erro) => {
          console.log(erro);
          req.flash("erro", "erro");
          res.redirect("/adicionar_local");
        });
    }
  });
};
exports.getUpdateLocal = (req, res) => {
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-local"]);
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
      locais.pegarDadosPorId(id).then((listagem) => {
        res.render("template-local-update", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          usuario_adm: resu[0].autoridade === "ADM",
          id_usuario_ref: resu[0].id,
          id_zona: resu[0].id_zona,
          porta: process.env.PORT,
          id_registro: id,
          listagem_eh_valida: listagem.length > 0,
          listagem,
        });
      });
    }
  });
};
exports.postUpdateLocal = (req, res) => {
  console.log("ROTA UPDATE local\n", req.body);
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      const id_registro = parseInt(req.body["id-registro-local"]);
      const objeto = { local: req.body.local };
      locais
        .updateRegistro(objeto, id_registro)
        .then(() => {
          req.flash("sucesso", true);
          res.redirect("/locais");
        })
        .catch((erro) => {
          console.log(erro);
          req.flash("erro", "erro");
          res.redirect("/update_local");
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
      locais
        .deletarRegistro(parseInt(req.body["id-registro-local"]))
        .then(() => {
          req.flash("sucesso", true);
          res.redirect("/locais");
        });
    }
  });
};
