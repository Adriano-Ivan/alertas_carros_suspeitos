const rotaBootstrapCSS = require("./linkCSSeBootstrap");
module.exports = (req, res, tempOverview) => {
  const replaceTemplate = require("../modules/replaceTemplate");
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  // const imagemHome = `${__dirname}/img/defesa_civil_repr.png`;
  const imagemHome = `http://localhost:8005/public/img/defesa_civil_repr.png`;
  const estiloBootstrapCSS = rotaBootstrapCSS();
  const boasVindas = "Bem-vindo !";
  const alerta = "{%ALERTA%}";
  const retornoEl = [
    `<img src='${imagemHome}'alt='imagem_defesa_civil'</img>`,
    `<h1>${boasVindas}</h1>`,
    `<div class='alerta-ocorrencia'>${alerta}</div>`,
    estiloBootstrapCSS,
  ];
  const retorno = replaceTemplate(
    tempOverview,
    retornoEl,
    null,
    "Nenhuma ocorrência pendente de atenção"
  );
  //console.log(retorno);
  res.status(200).end(retorno);
};
