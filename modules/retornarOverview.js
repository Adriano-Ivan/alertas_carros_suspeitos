const rotaBootstrapCSS = require("./linkCSSeBootstrap");
const estiloBootstrapCSS = rotaBootstrapCSS();
const retornarRelatorio = require("./retornarRelatorio");

let retornoRelatorio = "";

const imagemHome = `http://localhost:8005/public/img/defesa_civil_repr.png`;

const boasVindas = "Bem-vindo";
module.exports = (req, res, dadosRelatorio = null) => {
  if (dadosRelatorio === null || dadosRelatorio.length === 0) {
    retornoRelatorio = [
      "Nenhuma ocorrência pendente de atenção",
      "Nenhum caso resolvido a ser listado",
    ];
  } else {
    retornoRelatorio = retornarRelatorio(dadosRelatorio);
  }
  let nome_usuario = "";
  Promise.resolve(req.user)
    .then((resu) => {
      // nome_usuario = resu[0].nome
      //   .split(" ")
      //   .map((s) => s.toLowerCase())
      //   .map((s) => {
      //     const s1 = s.slice(0, 1).toUpperCase();
      //     return `${s1}${s.slice(1)}`;
      //   })
      //   .join(" ");
      nome_usuario = resu[0].nome;
    })
    .then(() => {
      console.log(nome_usuario);
      res.render("template-overview", {
        BOOTSTRAP_CSS: estiloBootstrapCSS.split("|")[0],
        ESTILO_CSS: estiloBootstrapCSS.split("|")[1],
        imagem_home: imagemHome,
        boas_vindas: boasVindas,
        retorno_relatorio_eh_array:
          typeof retornoRelatorio[0] === "object" &&
          retornoRelatorio[0].length > 0,
        retorno_relatorio1: retornoRelatorio[0],
        retorno_relatorio2: retornoRelatorio[1],
        nome_usuario,
      });
    });
};
