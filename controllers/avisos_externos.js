const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const mensagensRecebidas = require("./../models/Mensagens_recebidas");
exports.getAvisosExternos = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    // nome_usuario = resu[0].nome
    //   .split(" ")
    //   .map((s) => s.toLowerCase())
    //   .map((s) => {
    //     const s1 = s.slice(0, 1).toUpperCase();
    //     return `${s1}${s.slice(1)}`;
    //   })
    //   .join(" ");
    mensagensRecebidas.pegarDados(resu[0].id).then((listagem) => {
      const dados = listagem.map((item, i) => {
        item["index"] = i + 1;
        return item;
      });
      console.log(dados);
      res.render("template-avisos-externos", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        porta: process.env.PORT,
        listagem_eh_valida: dados.length > 0,
        listagem: dados,
      });
    });
  });
};

exports.deletarMensagem = (req, res) => {
  const id = parseInt(req.body["id-registro-observacao"]);
  mensagensRecebidas.deletarMensagem(id).then(() => {
    res.redirect("/avisos_externos");
  });
};
