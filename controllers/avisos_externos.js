const rotaBootstrapCSS = require("../helpers/linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const mensagensRecebidas = require("./../models/Mensagens_recebidas");
exports.getAvisosExternos = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    mensagensRecebidas.pegarDados(resu[0].id).then((listagem) => {
      const dados = listagem.map((item, i) => {
        item["index"] = i + 1;
        // item["mensagem_recebida"] = item["mensagem_recebida"].replace(
        //   /-b-/g,
        //   "\n"
        // );
        console.log(item["mensagem_recebida"]);
        return item;
      });
      //console.log(dados);
      res.render("template-avisos-externos", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        usuario_adm: resu[0].autoridade === "ADM",
        porta: process.env.PORT,
        listagem_eh_valida: dados.length > 0,
        listagem: dados,
      });
    });
  });
};
exports.getMensagensPorDescricao = (req, res) => {
  const descricao = req.params.descricao;
  Promise.resolve(req.user).then((resu) => {
    mensagensRecebidas
      .buscarPorDescricao(descricao, resu[0].id)
      .then((listagem) => {
        const dados = listagem.map((item, index) => {
          item["index"] = index + 1;
          item["mensagem_recebida"] = item["mensagem_recebida"].replace(
            "-br-",
            "<br>"
          );
          return item;
        });
        console.log(dados);
        res.render("template-avisos-externos", {
          BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
          ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
          usuario_adm: resu[0].autoridade === "ADM",
          porta: process.env.PORT,
          listagem_eh_valida: dados.length > 0,
          listagem: dados,
        });
      });
  });
};

exports.deletarMensagem = (req, res) => {
  Promise.resolve(req.user).then((resu) => {
    const id = parseInt(req.body["id-registro-observacao"]);
    mensagensRecebidas.deletarMensagem(id, resu[0].id).then(() => {
      res.redirect("/avisos_externos");
    });
  });
};
