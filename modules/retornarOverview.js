const rotaBootstrapCSS = require("./linkCSSeBootstrap");
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
    retornoRelatorio +=
      "<h4>Há casos que requerem sua atenção !</h4><ul class='lista-relatorio'>";
    for (arr of dadosRelatorio) {
      for (obj of arr) {
        if (
          Object.keys(obj).includes("status_roubados") &&
          Object.keys(obj).includes("vezes_roubados")
        ) {
          if (obj["status_roubados"] !== "Resolvido") {
            retornoRelatorio += `<li>${obj["vezes_roubados"]} veículo${
              obj["vezes_roubados"] > 1 ? "s" : ""
            } roubados com status ${obj["status_roubados"]}</li>`;
          }
        }
        if (
          Object.keys(obj).includes("status_irregulares") &&
          Object.keys(obj).includes("vezes_irregulares")
        ) {
          if (obj["status_irregulares"] !== "Resolvido") {
            retornoRelatorio += `<li>${obj["vezes_irregulares"]} veículo${
              obj["vezes_irregulares"] > 1 ? "s" : ""
            } em estado irregular com status ${obj["status_irregulares"]}</li>`;
          }
        }
        if (
          Object.keys(obj).includes("status_infracao") &&
          Object.keys(obj).includes("vezes_infracao")
        ) {
          if (obj["status_infracao"] !== "Resolvido") {
            retornoRelatorio += `<li>${obj["vezes_infracao"]} veículo${
              obj["vezes_infracao"] > 1 ? "s" : ""
            } com infração pendente com status ${obj["status_infracao"]}</li>`;
          }
        }
        if (
          Object.keys(obj).includes("status_suspeitos") &&
          Object.keys(obj).includes("vezes_suspeitos")
        ) {
          if (obj["status_suspeitos"] !== "Resolvido") {
            retornoRelatorio += `<li>${obj["vezes_suspeitos"]} veículo${
              obj["vezes_suspeitos"] > 1 ? "s" : ""
            } suspeito${obj["vezes_suspeitos"] > 1 ? "s" : ""} com status ${
              obj["status_suspeitos"]
            }</li>`;
          }
        }
      }
    }
    retornoRelatorio += "</ul>";
    retornoRelatorio += "<h5>Por favor, consulte a aba de alertas !</h5>";
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
