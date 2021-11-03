const rotaBootstrapCSS = require("./linkCSSeBootstrap");

module.exports = (retorno, tipo, template) => {
  const tela = retorno.replace(
    `{%${tipo}%}`,
    `<strong style='margin-top:30px'>NÃO HÁ ITENS NA LISTA DE ${tipo.replace(
      "_",
      " "
    )}</strong>`
  );
  const templateRetornado = template
    .replace(
      /{%ELEMENT_OF_REPR%}/g,

      tela
    )
    .replace(/{%BOOTSTRAP_CSS%}{%ESTILO_CSS%}/g, rotaBootstrapCSS());

  return templateRetornado;
  //console.log("HOUVE ERRO NA HORA DE INSERIR NA TELA");
};
