module.exports = (retorno) => {
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