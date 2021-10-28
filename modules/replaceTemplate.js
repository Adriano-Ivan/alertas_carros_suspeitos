module.exports = (template, retorno, dados = null) => {
  const pegarRetornoVeiculos = (retorno) => {
    if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
      return "{%LINHAS_ROUBADOS%}";
    }
    if (retorno.includes("{%LINHAS_IRREGULARES%}")) {
      return "{%LINHAS_IRREGULARES%}";
    }
    if (retorno.includes("{%LINHAS_INFRAÇÃO%}")) {
      return "{%LINHAS_INFRAÇÃO%}";
    }
  };
  const verificarRetornoVeiculos = (retorno) => {
    if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
      return true;
    }
    if (retorno.includes("{%LINHAS_IRREGULARES%}")) {
      return true;
    }
    if (retorno.includes("{%LINHAS_INFRAÇÃO%}")) {
      return true;
    }
  };
  const verificarTipoSuspeito = (retorno) => {
    if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
      return "roubados";
    }
    if (retorno.includes("{%LINHAS_IRREGULARES%}")) {
      return "irregulares";
    }
    if (retorno.includes("{%LINHAS_INFRAÇÃO%}")) {
      return "infracoes";
    }
  };
  let templateRetornado = template;
  //console.log(retorno.includes("{%LINHAS_ROUBADOS%}"));
  if (dados === null && retorno.length === 2) {
    templateRetornado = templateRetornado.replace(
      /{%ELEMENT_OF_REPR%}/g,
      retorno.join("")
    );
  } else if (verificarRetornoVeiculos(retorno)) {
    let tabela = retorno;
    let linhas = ``;
    for (let i = 0; i < dados.length; i++) {
      linhas += `<tr>
        <td>${dados[i].id}</td>
        <td>${dados[i].nome}</td>
        <td>${dados[i].placa}</td>
        <td>${dados[i].status}</td>
        <td>${dados[i].urgencia}</td>
        <td class='icone-editar'><form><button id="editar-registro-${verificarTipoSuspeito(
          retorno
        )}"></button></form></td>
        </tr>
        `;
    }
    tabela = tabela.replace(pegarRetornoVeiculos(retorno), linhas);
    templateRetornado = templateRetornado.replace(
      /{%ELEMENT_OF_REPR%}/g,
      tabela
    );
  } else if (retorno.includes("{%TAREFAS%}")) {
    if (dados === null) {
      let tela = retorno.replace(
        "{%TAREFAS%}",
        `<strong>NÃO HÁ ITENS NA LISTA DE TAREFAS</strong>`
      );
      templateRetornado = templateRetornado.replace(
        /{%ELEMENT_OF_REPR%}/g,

        tela
      );
      console.log("HOUVE ERRO NA HORA DE INSERIR NA TELA");
    } else {
      console.log(dados["id"]);
      let itemsTarefas = `${dados}`;
      const telaComLista = retorno.replace("{%TAREFAS%}", itemsTarefas);
      templateRetornado = templateRetornado.replace(
        /{%ELEMENT_OF_REPR%}/g,

        telaComLista
      );
    }
  } else if (retorno.includes("{%OBSERVAÇÕES%}")) {
    templateRetornado = templateRetornado.replace(
      /{%ELEMENT_OF_REPR%}/g,

      retorno
    );
  } else if (retorno.includes("{%AVISOS%}")) {
    templateRetornado = templateRetornado.replace(
      /{%ELEMENT_OF_REPR%}/g,
      retorno
    );
  }
  return templateRetornado;
};
