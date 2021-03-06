const rotaBootstrapCSS = require("./linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const retornarRelatorio = require("./retornarRelatorio");

let retornoRelatorio = "";

const imagemHome = `http://localhost:${process.env.PORT}/public/img/defesa_civil_repr.png`;

const boasVindas = "Bem-vindo";
module.exports = (req, res, dadosRelatorio = null) => {
  retornoRelatorio = retornarRelatorio(dadosRelatorio);

  let nome_usuario = "";
  let usuario_adm = false;
  let id_zona = "";
  let id_usuario_ref = "";
  Promise.resolve(req.user)
    .then((resu) => {
      nome_usuario = resu[0].nome
        .split(" ")
        .map((s) => s.toLowerCase())
        .map((s) => {
          const s1 = s.slice(0, 1).toUpperCase();
          return `${s1}${s.slice(1)}`;
        })
        .join(" ");
      usuario_adm = resu[0].autoridade === "ADM";
      id_zona = resu[0].id_zona;
      id_usuario_ref = resu[0].id;
      //nome_usuario = resu[0].nome;
    })
    .then(() => {
      console.log(nome_usuario);
      res.render("template-overview", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        imagem_home: imagemHome,
        boas_vindas: boasVindas,
        retorno_relatorio_valido_alerta: retornoRelatorio[0].length > 0,
        retorno_relatorio1_valido: retornoRelatorio[0].length > 0,
        retorno_relatorio2_valido: retornoRelatorio[1].length > 0,
        retorno_relatorio1: retornoRelatorio[0],
        retorno_relatorio2: retornoRelatorio[1],
        id_usuario_ref,
        id_zona,
        nome_usuario,
        usuario_adm,
        porta: process.env.PORT,
      });
    });
};
