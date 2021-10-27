module.exports = (template, retorno, dados = null) => {
  let templateRetornado = template;
  //console.log(retorno.includes("{%LINHAS_ROUBADOS%}"));
  if (dados === null && retorno.length === 2) {
    templateRetornado = templateRetornado.replace(
      /{%ELEMENT_OF_REPR%}/g,
      retorno.join("")
    );
  } else if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
    let tabela = retorno;
    let linhas = ``;
    for (let i = 0; i < dados.length; i++) {
      linhas += `<tr>
        <td>${dados[i].id}</td>
        <td>${dados[i].nome}</td>
        <td>${dados[i].placa}</td>
        <td>${dados[i].status}</td>
        <td>${dados[i].urgencia}</td>
        <td class='icone-editar'><button></button></td>
        </tr>
        `;
    }
    tabela = tabela.replace("{%LINHAS_ROUBADOS%}", linhas);
    templateRetornado = templateRetornado.replace(
      "{%ELEMENT_OF_REPR%}",
      tabela
    );
  } else if (retorno.includes("{%TAREFAS%}")) {
    if (dados === null) {
      let tela = retorno.replace(
        "{%TAREFAS%}",
        `<strong>NÃO HÁ ITENS NA LISTA DE TAREFAS</strong>`
      );
      templateRetornado = templateRetornado.replace(
        "{%ELEMENT_OF_REPR%}",
        tela
      );
      console.log("HOUVE ERRO NA HORA DE INSERIR NA TELA");
    } else {
      console.log(dados["id"]);
      let itemsTarefas = `${dados}`;
      const telaComLista = retorno.replace("{%TAREFAS%}", itemsTarefas);
      templateRetornado = templateRetornado.replace(
        "{%ELEMENT_OF_REPR%}",
        telaComLista
      );
    }
  } else if (retorno.includes("{%OBSERVAÇÕES%}")) {
    templateRetornado = templateRetornado.replace(
      "{%ELEMENT_OF_REPR%}",
      retorno
    );
  }
  return templateRetornado;
};
