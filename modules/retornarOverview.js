module.exports = (req, res, tempOverview) => {
  const replaceTemplate = require("../modules/replaceTemplate");
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  // const imagemHome = `${__dirname}/img/defesa_civil_repr.png`;
  const imagemHome = `http://localhost:8005/public/img/defesa_civil_repr.png`;
  const boasVindas = "Bem-vindo !";
  const retornoEl = [
    `<img src='${imagemHome}'alt='imagem_defesa_civil'</img>`,
    `<h1>${boasVindas}</h1>`,
  ];
  const retorno = replaceTemplate(tempOverview, retornoEl);
  //console.log(retorno);
  res.end(retorno);
};
