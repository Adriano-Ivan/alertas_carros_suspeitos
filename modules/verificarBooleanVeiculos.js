module.exports = (retorno) => {
  if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
    return true;
  }
  if (retorno.includes("{%LINHAS_IRREGULARES%}")) {
    return true;
  }
  if (retorno.includes("{%LINHAS_INFRAÇÃO%}")) {
    return true;
  }
  return false;
};
