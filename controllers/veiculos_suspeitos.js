const listaVeiculosSuspeitos = require("../models/Veiculos_suspeitos");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const url = require("url");
const usuario = require("./../models/Usuario");
const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

exports.getVeiculosSuspeitos = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosSuspeitos.pegarDados(resu[0].id_zona).then((listagem) => {
      //console.log(listagem);
      res.render("template-suspeitos", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
        usuario_adm: resu[0].autoridade === "ADM",
        id_zona: resu[0].id_zona,
        porta: process.env.PORT,
        placa_errada: req.flash("erro"),
        sucesso: req.flash("sucesso"),
      });
    });
  });
};
exports.getVeiculosSuspeitosPorPlaca = (req, res) => {
  const placa = req.params.placa;
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosSuspeitos.buscarPorPlaca(placa).then((listagem) => {
      // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
      // res.status(200).end(retorno);

      res.render("template-suspeitos", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
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
      res.render("template-suspeito-insert", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        porta: process.env.PORT,
        id_usuario: resu[0].id,
        usuario_adm: resu[0].autoridade === "ADM",
        id_zona: resu[0].id_zona,
        placa_errada: req.flash("erro"),
        sucesso: req.flash("sucesso"),
      });
    }
  });
};

exports.postAdicionarSuspeito = (req, res) => {
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
          local_alerta: req.body.local,
        };
        listaVeiculosSuspeitos
          .inserirRegistro(objeto)
          .then(() => usuario.updateInserts(1, parseInt(req.body.id_usuario)))
          .then(() => {
            req.flash("sucesso", true);
            res.redirect("/adicionar_suspeito");
          })
          .catch((erro) => console.log(erro));
      }
    });
  } else {
    //console.log("IETA");
    req.flash("erro", "placa inválida");
    res.redirect("/adicionar_suspeito");
  }
};
exports.getUpdateVeiculo = (req, res) => {
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-suspeito"]);
  console.log(id);
  Promise.resolve(req.user).then((resu) => {
    if (!(resu[0].autoridade === "ADM")) {
      res.render("forbidden", {
        porta: process.env.PORT,
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
      });
    } else {
      listaVeiculosSuspeitos.pegarDadosPorId(id).then((listagem) => {
        console.log(resu);
        console.log();
        res.render("template-suspeito-update", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          porta: process.env.PORT,
          id_registro: id,
          usuario_adm: resu[0].autoridade === "ADM",
          id_zona: resu[0].id_zona,
          listagem_eh_valida: listagem.length > 0,
          listagem,
        });
      });
    }
  });
};
exports.postUpdateVeiculo = (req, res) => {
  console.log("ROTA UPDATE SUSPEITO\n", req.body);

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
          local_alerta: req.body.local,
        };
        const id_registro = parseInt(req.body["id-registro-suspeito"]);

        listaVeiculosSuspeitos
          .updateRegistro(objeto, id_registro)
          .then(() =>
            listaVeiculosSuspeitos.updateUltimoEditor(id_registro, resu[0].id)
          )
          .then(() => {
            req.flash("sucesso", true);
            res.redirect("/veiculos_suspeitos");
          })
          .catch((erro) => console.log(erro, "EITA"));
      }
    });
  } else {
    req.flash("erro", "placa inválida");
    res.redirect("/veiculos_suspeitos");
  }
};
exports.deletarRegistro = (req, res) => {
  listaVeiculosSuspeitos
    .deletarRegistro(parseInt(req.body["id-registro-suspeito"]))
    .then(() => {
      req.flash("sucesso", true);
      res.redirect("/veiculos_suspeitos");
    });
};
