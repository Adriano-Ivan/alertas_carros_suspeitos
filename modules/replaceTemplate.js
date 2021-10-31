const linkCSS = require("./linkCSS");
const pegarRetornoVeiculos = require("./pegarRetornoVeiculos");
const verificarBooleanVeiculos = require("./verificarBooleanVeiculos");
const verificarTipoSuspeito = require("./verificarTipoSuspeito");
const retornarConteudoNulo = require("./retornarConteudoNulo");
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
    for (let i = 0; i < dados.length; i++) {
      linhas += `<tr>
        <td>${dados[i].id}</td>
        <td>${dados[i].nome}</td>
        <td>${dados[i].placa}</td>
        <td>${dados[i].status}</td>
        <td>${dados[i].urgencia}</td>
        <td class='icone-editar'><form><button class="editar-registro-${verificarTipoSuspeito(
          retorno
        )}">↘</button></form></td>
        </tr>
        `;
    }
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
      //console.log(dados);
      const itemsTarefas = dados.map(
        (registro, index) =>
          `<li class='item-tarefa'><div><div class='id-tarefa'>${
            index + 1
          }</div></div> <p class='desc-tarefa'>${
            registro.descricao
          }</p><form action="/update_tarefa/" method='GET'enctype="application/x-www-form-urlencoded" role='form'><input type='number' name='id-registro-tarefa'value=${
            registro.id
          }><button class='edicao-tarefa'>↘</button></form><form action = '/delete_tarefa/'method='post' enctype="application/x-www-form-urlencoded"><input type='number' name='id-registro-tarefa'value=${
            registro.id
          }><button class='exclusao-tarefa'>x</button></form></li>`
      );
      const listagem = `<ul class='lista-tarefa'>${itemsTarefas.join("")}</ul>`;
      const telaComLista = retorno.replace("{%TAREFAS%}", listagem);
      templateRetornado = templateRetornado
        .replace(
          /{%ELEMENT_OF_REPR%}/g,

          telaComLista
        )
        .replace(/{%ESTILO_CSS%}/g, linkCSS());
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
      templateRetornado = templateRetornado
        .replace(
          /{%ELEMENT_OF_REPR%}/g,

          retorno
        )
        .replace(/{%ESTILO_CSS%}/g, linkCSS());
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
    console.log("eita");
  }
  return templateRetornado;
};
