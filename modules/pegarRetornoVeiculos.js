module.exports = (retorno) => {
  if (retorno.includes("{%LINHAS_ROUBADOS%}")) {
    return "{%LINHAS_ROUBADOS%}";
  }
  if (retorno.includes("{%LINHAS_IRREGULARES%}")) {
    return "{%LINHAS_IRREGULARES%}";
  }
  if (retorno.includes("{%LINHAS_INFRAÇÃO%}")) {
    return "{%LINHAS_INFRAÇÃO%}";
  }
  if (retorno.includes("{%LINHAS_SUSPEITOS%}")) {
    return "{%LINHAS_SUSPEITOS%}";
  }
};
