module.exports = (linhas, dados, retorno) => {
  let linhasRetorno = linhas;

  //console.log(dados);
  if (
    retorno.includes("{%LINHAS_ROUBADOS%}") ||
    retorno.includes("{%LINHAS_INFRAÇÃO%}") ||
    retorno.includes("{%LINHAS_IRREGULARES%}")
  ) {
    console.log("ENTROU NO FOR");
    let ultimaColuna = "";
    if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
      ultimaColuna = "local_roubo";
    } else if (retorno.includes("{%LINHAS_INFRAÇÃO%}")) {
      ultimaColuna = "gravidade_infracao";
    } else {
      ultimaColuna = "medida_administrativa";
    }
    for (let i = 0; i < dados.length; i++) {
      linhasRetorno += `<tr>
        <td>${dados[i].dono}</td>
        <td>${dados[i].placa}</td>
        <td>${dados[i].status}</td>
        <td>${dados[i].nivel_urgencia}</td>
        <td>${dados[i].local_alerta}</td>
        <td>${dados[i][ultimaColuna]}</td>
        </tr>
        `;
    }
  }

  return linhasRetorno;
};
