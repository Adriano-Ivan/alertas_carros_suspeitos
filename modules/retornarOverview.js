const rotaBootstrapCSS = require("./linkCSSeBootstrap");
const retornarRelatorio = require("./retornarRelatorio");
module.exports = (req, res, tempOverview, dadosRelatorio = null) => {
  const replaceTemplate = require("../modules/replaceTemplate");
  let retornoRelatorio = "";
  // const imagemHome = `${__dirname}/img/defesa_civil_repr.png`;
  const imagemHome = `http://localhost:8005/public/img/defesa_civil_repr.png`;
  const estiloBootstrapCSS = rotaBootstrapCSS();
  const boasVindas = "Bem-vindo !";
  const alerta = "{%ALERTA%}";
  const retornoEl = [
    `<img src='${imagemHome}'alt='imagem_defesa_civil'</img>`,
    `<h1>${boasVindas}</h1>`,
    `<div class='alerta-ocorrencia font-weight-bold alert alert-danger' role='alert'><h4>${alerta}</h4></div>`,
    estiloBootstrapCSS,
  ];
  if (dadosRelatorio === null || dadosRelatorio.length === 0) {
    retornoRelatorio = "Nenhuma ocorrência pendente de atenção";
  } else {
    retornoRelatorio = retornarRelatorio(dadosRelatorio, retornoRelatorio);
  }
  const retorno = replaceTemplate(
    tempOverview,
    retornoEl,
    null,
    retornoRelatorio
  );
  //console.log(retorno);
  res.status(200).end(retorno);
  //console.log("EITA - ENTROU NA FUNÇÃO");
  //return retorno;
};
