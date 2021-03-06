const listaVeiculosInfracao = require("./../models/Veiculos_infracao");
const listaZonas = require("./../models/Zonas");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const url = require("url");
const usuario = require("./../models/Usuario");
const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

exports.getVeiculosInfracao = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosInfracao.pegarDados(resu[0].id_zona).then((listagem) => {
      //console.log(listagem);
      console.log(resu);
      res.render("template-infracao", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
        usuario_adm: resu[0].autoridade === "ADM",
        id_usuario_ref: resu[0].id,
        id_zona: resu[0].id_zona,
        porta: process.env.PORT,
        placa_errada: req.flash("erro"),
        sucesso: req.flash("sucesso"),
      });
    });
  });
};
exports.getVeiculosInfracaoPorPlaca = (req, res) => {
  const placa = req.params.placa;
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosInfracao.buscarPorPlaca(placa).then((listagem) => {
      // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
      // res.status(200).end(retorno);
      console.log(resu);
      res.render("template-irregulares", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
        id_usuario_ref: resu[0].id,
        usuario_adm: resu[0].autoridade === "ADM",
        id_zona: resu[0].id_zona,
        porta: process.env.PORT,
      });
    });
  });
};

exports.getAdicionarVeiculo = (req, res) => {
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
      listaZonas.pegarDados().then((listagemZonas) => {
        res.render("template-infracao-insert", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          porta: process.env.PORT,
          listagem_zonas: listagemZonas,
          usuario_adm: resu[0].autoridade === "ADM",
          id_usuario_ref: resu[0].id,
          id_zona: resu[0].id_zona,
          id_usuario: resu[0].id,
          placa_errada: req.flash("erro"),
          sucesso: req.flash("sucesso"),
        });
      });
    }
  });
};
exports.postAdicionarInfracao = (req, res) => {
  if (
    regexPlaca.test(req.body.placa) ||
    regexPlacaMercosulCarro.test(req.body.placa) ||
    regexPlacaMercosulMoto.test(req.body.placa)
  ) {
    Promise.resolve(req.user).then((resu) => {
      if (!(resu[0].autoridade === "ADM")) {
        res.render("forbidden", {
          porta: process.env.PORT,
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        });
      } else {
        const objeto = {
          dono: req.body.dono,
          placa: req.body.placa,
          nivel_urgenciaID: parseInt(req.body.nivel_urgencia),
          statusID: parseInt(req.body.status),
          id_usuario: parseInt(req.body.id_usuario),
          momento_alerta: `${req.body.data} ${req.body.hora}`,
          local_alerta: req.body.local_alerta,
          id_zona: req.body.id_zona,
          gravidade_infracao: req.body.gravidade_infracao,
        };
        listaVeiculosInfracao
          .inserirRegistro(objeto)
          .then(() => usuario.updateInserts(1, parseInt(req.body.id_usuario)))
          .then(() => {
            req.flash("sucesso", true);
            res.redirect("/adicionar_infracao");
          })
          .catch((erro) => console.log(erro));
      }
    });
  } else {
    //console.log("IETA");
    req.flash("erro", "placa inv??lida");
    res.redirect("/adicionar_infracao");
  }
};
exports.getUpdateVeiculo = (req, res) => {
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-infracao"]);
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
      listaVeiculosInfracao.pegarDadosPorId(id).then((listagem) => {
        //console.log(resu);
        listaZonas.pegarDados().then((listagemZonas) => {
          res.render("template-infracao-update", {
            BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
            ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
            porta: process.env.PORT,
            id_registro: id,
            usuario_adm: resu[0].autoridade === "ADM",
            id_usuario_ref: resu[0].id,
            id_zona: resu[0].id_zona,
            listagem_eh_valida: listagem.length > 0,
            listagem,
            listagem_zonas: listagemZonas,
          });
        });
      });
    }
  });
};
exports.postUpdateVeiculo = (req, res) => {
  console.log("ROTA UPDATE infracao\n", req.body);

  if (
    regexPlaca.test(req.body.placa) ||
    regexPlacaMercosulCarro.test(req.body.placa) ||
    regexPlacaMercosulMoto.test(req.body.placa)
  ) {
    Promise.resolve(req.user).then((resu) => {
      if (!(resu[0].autoridade === "ADM")) {
        res.render("forbidden", {
          porta: process.env.PORT,
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        });
      } else {
        const objeto = {
          dono: req.body.dono,
          placa: req.body.placa,
          nivel_urgenciaID: parseInt(req.body.nivel_urgencia),
          statusID: parseInt(req.body.status),
          momento_alerta: `${req.body.data} ${req.body.hora}`,
          local_alerta: req.body.local_alerta,
          gravidade_infracao: req.body.gravidade_infracao,
          id_zona: req.body.id_zona,
        };

        const id_registro = parseInt(req.body["id-registro-infracao"]);

        listaVeiculosInfracao
          .updateRegistro(objeto, id_registro)
          .then(() =>
            listaVeiculosInfracao.updateUltimoEditor(id_registro, resu[0].id)
          )
          .then(() => {
            req.flash("sucesso", true);
            res.redirect("/veiculos_infracao");
          })
          .catch((erro) => console.log(erro, "EITA"));
      }
    });
  } else {
    req.flash("erro", "placa inv??lida");
    res.redirect("/veiculos_infracao");
  }
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
      listaVeiculosInfracao
        .deletarRegistro(parseInt(req.body["id-registro-infracao"]))
        .then(() => {
          req.flash("sucesso", true);
          res.redirect("/veiculos_infracao");
        });
    }
  });
};
