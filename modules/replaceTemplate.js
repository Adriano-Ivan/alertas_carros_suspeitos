module.exports = (template, retorno, dados = null) => {
  let templateRetornado = template;
  //console.log(retorno.includes("{%LINHAS_ROUBADOS%}"));
  if (dados === null) {
    templateRetornado = templateRetornado.replace(
      /{%ELEMENT_OF_REPR%}/g,
      retorno
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
  }
  return templateRetornado;
};
