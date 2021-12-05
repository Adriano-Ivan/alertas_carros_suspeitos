const listaVeiculosRoubados = require("../models/Veiculos_roubados");
const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const url = require("url");
const usuario = require("./../models/Usuario");
const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

exports.getVeiculosRoubados = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosRoubados.pegarDados().then((listagem) => {
      //console.log(listagem);
      res.render("template-roubados", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
        usuario_adm: resu[0].autoridade === "ADM",
        porta: process.env.PORT,
        placa_errada: req.flash("erro"),
        sucesso: req.flash("sucesso"),
      });
    });
  });
};

exports.getVeiculosRoubadosPorPlaca = (req, res) => {
  //res.writeHead(200, { "Content-type": "text/html" });
  const placa = req.params.placa;
  Promise.resolve(req.user).then((resu) => {
    listaVeiculosRoubados.buscarPorPlaca(placa).then((listagem) => {
      // const retorno = replaceTemplate(tempOverview, tempRoubados, item);
      // res.status(200).end(retorno);

      res.render("template-roubados", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        listagem_eh_valida: listagem.length > 0,
        listagem,
        usuario_adm: resu[0].autoridade === "ADM",
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
      res.render("template-roubado-insert", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        porta: process.env.PORT,
        id_usuario: resu[0].id,
        usuario_adm: resu[0].autoridade === "ADM",
        placa_errada: req.flash("erro"),
        sucesso: req.flash("sucesso"),
      });
    }
  });
};
exports.postAdicionarRoubado = (req, res) => {
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
          local_roubo: req.body.local_roubo,
        };
        listaVeiculosRoubados
          .inserirRegistro(objeto)
          .then(() => usuario.updateInserts(1, parseInt(req.body.id_usuario)))
          .then(() => {
            req.flash("sucesso", true);
            res.redirect("/adicionar_roubado");
          })
          .catch((erro) => console.log(erro));
      }
    });
  } else {
    //console.log("IETA");
    req.flash("erro", "placa inválida");
    res.redirect("/adicionar_roubado");
  }
};
exports.getUpdateVeiculo = (req, res) => {
  const { query } = url.parse(req.url, true);
  //console.log(query);
  const id = parseInt(query["id-registro-roubado"]);
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
      listaVeiculosRoubados.pegarDadosPorId(id).then((listagem) => {
        console.log(resu);
        console.log();
        res.render("template-roubado-update", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          porta: process.env.PORT,
          id_registro: id,
          usuario_adm: resu[0].autoridade === "ADM",
          listagem_eh_valida: listagem.length > 0,
          listagem,
        });
      });
    }
  });
};
exports.postUpdateVeiculo = (req, res) => {
  console.log("ROTA UPDATE roubado\n", req.body);

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
          local_roubo: req.body.local_roubo,
        };
        const id_registro = parseInt(req.body["id-registro-roubado"]);

        listaVeiculosRoubados
          .updateRegistro(objeto, id_registro)
          .then(() =>
            listaVeiculosRoubados.updateUltimoEditor(id_registro, resu[0].id)
          )
          .then(() => {
            req.flash("sucesso", true);
            res.redirect("/veiculos_roubados");
          })
          .catch((erro) => console.log(erro, "EITA"));
      }
    });
  } else {
    req.flash("erro", "placa inválida");
    res.redirect("/veiculos_roubados");
  }
};
exports.deletarRegistro = (req, res) => {
  listaVeiculosRoubados
    .deletarRegistro(parseInt(req.body["id-registro-roubado"]))
    .then(() => {
      req.flash("sucesso", true);
      res.redirect("/veiculos_roubados");
    });
};
