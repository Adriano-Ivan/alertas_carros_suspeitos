const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const nodemailer = require("nodemailer");
const mensagensEnviadas = require("./../models/Mensagens_enviadas");

exports.getEnvioDeAvisos = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    mensagensEnviadas.pegarDados(resu[0].id).then((listagem) => {
      const dados = listagem.map((item, i) => {
        item["index"] = i + 1;
        return item;
      });
      res.render("template-envio-aviso", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        porta: process.env.PORT,
        avisos_enviados_validos: dados.length > 0,
        usuario_adm: resu[0].autoridade === "ADM",
        listagem: dados,
        enviado: req.flash("sucessoEnvio"),
        excluido: req.flash("sucessoExclusao"),
      });
    });
  });
};
exports.enviarEmail = (req, res) => {
  const email = req.body.email;
  const mensagem = req.body.mensagem_enviada;
  let message = "";
  let usuario = "";
  let remetente = "";
  // Configurar o transporter
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2c9ac4475b360e",
      pass: "355f9c7aa46c26",
    },
  });
  // Configurar a mensagem
  Promise.resolve(req.user)
    .then((resu) => {
      usuario = resu[0].nome
        .split(" ")
        .map((s) => s.toLowerCase())
        .map((s) => {
          const s1 = s.slice(0, 1).toUpperCase();
          return `${s1}${s.slice(1)}`;
        })
        .join(" ");
      remetente = resu[0].email;
      //nome_usuario = resu[0].nome;
    })
    .then(() => {
      message = {
        from: `${usuario}<${remetente}>`,
        to: email,
        subject: req.body.assunto,
        html: `Opa <strong>${usuario}</strong>, como vai ?<br>${mensagem}`,
        text: `Opa ${usuario}, como vai ?\n\n${mensagem}`,
      };
    })
    .then(async () => {
      // Enviar mensagem
      let info = await transport.sendMail(message);
      console.log("info: ", info);
    })
    .then(() => {
      console.log(`${mensagem} para ${email}`);
      console.log("ROTA POST EMAIL");

      Promise.resolve(req.user).then((resu) => {
        mensagensEnviadas.adiciona(mensagem, resu[0].id).then(() => {
          req.flash("sucessoEnvio", true);
          res.redirect("/envio_de_aviso");
        });
      });
    })
    .catch((erro) => console.log(erro));
};
exports.getMensagensPorDescricao = (req, res) => {
  const descricao = req.params.descricao;
  Promise.resolve(req.user).then((resu) => {
    mensagensEnviadas
      .buscarPorDescricao(descricao, resu[0].id)
      .then((listagem) => {
        const dados = listagem.map((item, index) => {
          item["index"] = index + 1;
          return item;
        });
        console.log(dados);
        res.render("template-envio-aviso", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          porta: process.env.PORT,
          usuario_adm: resu[0].autoridade === "ADM",
          avisos_enviados_validos: dados.length > 0,
          listagem: dados,
        });
      });
  });
};

exports.excluirMensagemEnviada = (req, res) => {
  const id = parseInt(req.body["id-registro-observacao"]);
  Promise.resolve(req.user).then((resu) => {
    mensagensEnviadas.deletarMensagem(id, resu[0].id).then(() => {
      req.flash("sucessoExclusao", true);
      res.redirect("/envio_de_aviso");
    });
  });
};
