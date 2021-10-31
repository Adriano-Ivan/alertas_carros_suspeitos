const linkCSS = require("./linkCSS");

module.exports = (retorno, tipo, template) => {
  const tela = retorno.replace(
    `{%${tipo}%}`,
    `<strong>NÃO HÁ ITENS NA LISTA DE ${tipo.replace("_", " ")}</strong>`
  );
  const templateRetornado = template
    .replace(
      /{%ELEMENT_OF_REPR%}/g,

      tela
    )
    .replace(/{%ESTILO_CSS%}/g, linkCSS());

  return templateRetornado;
  //console.log("HOUVE ERRO NA HORA DE INSERIR NA TELA");
};
