const linkCSS = require("./linkCSS");
const pegarRetornoVeiculos = require("./pegarRetornoVeiculos");
const verificarBooleanVeiculos = require("./verificarBooleanVeiculos");
const verificarTipoSuspeito = require("./verificarTipoSuspeito");
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
        )}"></button></form></td>
        </tr>
        `;
    }
    tabela = tabela.replace(pegarRetornoVeiculos(retorno), linhas);
    templateRetornado = templateRetornado
      .replace(/{%ELEMENT_OF_REPR%}/g, tabela)
      .replace(/{%ESTILO_CSS%}/g, linkCSS());
  } else if (retorno.includes("{%TAREFAS%}")) {
    if (dados === null || dados.length === 0) {
      let tela = retorno.replace(
        "{%TAREFAS%}",
        `<strong>NÃO HÁ ITENS NA LISTA DE TAREFAS</strong>`
      );
      templateRetornado = templateRetornado
        .replace(
          /{%ELEMENT_OF_REPR%}/g,

          tela
        )
        .replace(/{%ESTILO_CSS%}/g, linkCSS());
      console.log("HOUVE ERRO NA HORA DE INSERIR NA TELA");
    } else {
      console.log(dados);
      const itemsTarefas = dados.map(
        (registro) =>
          `<li class='item-tarefa'><div class='id-tarefa'>${registro.id}</div>  <p class='desc-tarefa'>${registro.descricao}</p><form><button class='exclusao-tarefa'>x</button></form></li>`
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
    templateRetornado = templateRetornado
      .replace(
        /{%ELEMENT_OF_REPR%}/g,

        retorno
      )
      .replace(/{%ESTILO_CSS%}/g, linkCSS());
  } else if (retorno.includes("{%AVISOS%}")) {
    templateRetornado = templateRetornado
      .replace(/{%ELEMENT_OF_REPR%}/g, retorno)
      .replace(/{%ESTILO_CSS%}/g, linkCSS());
  } else if (retorno.includes("{%LOCAIS%}")) {
    templateRetornado = templateRetornado
      .replace(/{%ELEMENT_OF_REPR%}/g, retorno)
      .replace(/{%ESTILO_CSS%}/g, linkCSS());
  } else if (retorno.includes("{%AVISOS_ENVIADOS%}")) {
    templateRetornado = templateRetornado
      .replace(/{%ELEMENT_OF_REPR%}/g, retorno)
      .replace(/{%ESTILO_CSS%}/g, linkCSS());
  }
  return templateRetornado;
};
