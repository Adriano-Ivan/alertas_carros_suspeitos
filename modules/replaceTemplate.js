const linkCSS = require("./linkCSS");
const pegarRetornoVeiculos = require("./pegarRetornoVeiculos");
const verificarBooleanVeiculos = require("./verificarBooleanVeiculos");
const retornarConteudoNulo = require("./retornarConteudoNulo");
const replacePendencias = require("./replacePendencias");
const replaceAlertas = require("./replaceAlertas");
module.exports = (template, retorno, dados = null) => {
  let templateRetornado = template;
  //console.log(retorno.includes("{%LINHAS_ROUBADOS%}"));
  if (dados === null && retorno.length >= 2 && typeof retorno === "object") {
    templateRetornado = templateRetornado
      .replace(/{%ELEMENT_OF_REPR%}/g, retorno.slice(0, 2).join(""))
      .replace(/{%ESTILO_CSS%}/g, retorno.slice(2));
  } else if (verificarBooleanVeiculos(retorno)) {
    let tabela = retorno;
    let linhas = ``;
    linhas = replaceAlertas(linhas, dados, retorno);
    tabela = tabela.replace(pegarRetornoVeiculos(retorno), linhas);
    templateRetornado = templateRetornado
      .replace(/{%ELEMENT_OF_REPR%}/g, tabela)
      .replace(/{%ESTILO_CSS%}/g, linkCSS());
  } else if (retorno.includes("{%TAREFAS%}")) {
    if (dados === null || dados.length === 0) {
      templateRetornado = retornarConteudoNulo(
        retorno,
        "TAREFAS",
        templateRetornado
      );
      //console.log("HOUVE ERRO NA HORA DE INSERIR NA TELA");
    } else {
      //console.log(typeof dados);
      templateRetornado = replacePendencias(
        templateRetornado,
        retorno,
        dados,
        "tarefa"
      );
    }
  } else if (retorno.includes("{%OBSERVAÇÕES%}")) {
    if (dados === null || dados.length === 0) {
      templateRetornado = retornarConteudoNulo(
        retorno,
        "OBSERVAÇÕES",
        templateRetornado
      );
      //console.log("HOUVE ERRO NA HORA DE INSERIR NA TELA");
    } else {
      templateRetornado = replacePendencias(
        template,
        retorno,
        dados,
        "observacao"
      );
    }
  } else if (retorno.includes("{%AVISOS%}")) {
    if (dados === null || dados.length === 0) {
      templateRetornado = retornarConteudoNulo(
        retorno,
        "AVISOS",
        templateRetornado
      );
    } else {
      templateRetornado = templateRetornado
        .replace(/{%ELEMENT_OF_REPR%}/g, retorno)
        .replace(/{%ESTILO_CSS%}/g, linkCSS());
    }
  } else if (retorno.includes("{%LOCAIS%}")) {
    if (dados === null || dados.length === 0) {
      templateRetornado = retornarConteudoNulo(
        retorno,
        "LOCAIS",
        templateRetornado
      );
    } else {
      templateRetornado = templateRetornado
        .replace(/{%ELEMENT_OF_REPR%}/g, retorno)
        .replace(/{%ESTILO_CSS%}/g, linkCSS());
    }
  } else if (retorno.includes("{%AVISOS_ENVIADOS%}")) {
    if (dados === null || dados.length === 0) {
      templateRetornado = retornarConteudoNulo(
        retorno,
        "AVISOS_ENVIADOS",
        templateRetornado
      );
    } else {
      templateRetornado = templateRetornado
        .replace(/{%ELEMENT_OF_REPR%}/g, retorno)
        .replace(/{%ESTILO_CSS%}/g, linkCSS());
    }
  } else if (retorno.includes('<section class="area-update">')) {
    const comIdTarefa = retorno.replace("{%ID%}", dados);

    templateRetornado = templateRetornado
      .replace(/{%ELEMENT_OF_REPR%}/g, comIdTarefa)
      .replace(/{%ESTILO_CSS%}/g, linkCSS());
    //console.log("eita");
  }
  return templateRetornado;
};
