const nodemailer = require("nodemailer");
exports.enviarEmail = (req, res) => {
  const email = req.body.email;
  const mensagem = req.body.descricao;
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
        subject: "Teste",
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
      res.redirect("/envio_de_aviso");
      console.log(`${mensagem} para ${email}`);
      console.log("ROTA POST EMAIL");
    })
    .catch((erro) => console.log(erro));
};
