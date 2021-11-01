module.exports = (linhas, dados, retorno) => {
  let linhasRetorno = linhas;
  if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
    for (let i = 0; i < dados.length; i++) {
      linhasRetorno += `<tr>
        <td>${dados[i].dono}</td>
        <td>${dados[i].placa}</td>
        <td>${dados[i].status}</td>
        <td>${dados[i].nivel_urgencia}</td>
        <td>${dados[i].local_roubo}</td>
        <td>${dados[i].local_alerta}</td>
        </tr>
        `;
    }
  }

  return linhasRetorno;
};
