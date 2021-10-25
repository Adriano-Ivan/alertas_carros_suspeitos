// Recursos
const fileSystem = require("fs");
const http = require("http");
const url = require("url");
const express = require("express");
const app = express();
app.use("/public", express.static(__dirname + `/public`));
// var app = express();
//Middlewares
// app.use(express.static("./app/public")); // mapeando arquivos estáticos com express

// app.use(express.static("./node_modules"));

// module.exports = app;
//const path = require("path");

// Funções
const criarArquivoJSON = function (nomes, ids, statusS, urgenciaNivel, placas) {
  const objetos = [];
  if (!fileSystem.existsSync(`${__dirname}/JSON/data.json`)) {
    for (let i = 0; i < nomes.length; i++) {
      const objeto = {
        id: ids[i].replace("\r", ""),
        nome: nomes[i].replace("\r", ""),
        status: statusS[Math.trunc(Math.random() * 3)].replace("\r", ""),
        urgencia: urgenciaNivel[Math.trunc(Math.random() * 3)].replace(
          "\r",
          ""
        ),
        placa: placas[i].replace("\r", ""),
      };
      objetos.push(objeto);
    }
    const json = JSON.stringify(objetos);
    fileSystem.writeFileSync(`${__dirname}/JSON/data.json`, json);
    //console.log("ACABOU");
  }
};
const replaceTemplate = function (template, retorno, dados = null) {
  let templateRetornado = template;
  console.log(retorno.includes("{%LINHAS_ROUBADOS%}"));
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
      <td><button class='icone-editar'></button></td>
      </tr>
      <tr>
      <td>${dados[i].id}</td>
      <td>${dados[i].nome}</td>
      <td>${dados[i].placa}</td>
      <td>${dados[i].status}</td>
      <td>${dados[i].urgencia}</td>
      <td><button class='icone-editar'></button></td>
      </tr>`;
    }
    tabela = tabela.replace("{%LINHAS_ROUBADOS%}", linhas);
    templateRetornado = templateRetornado.replace(
      "{%ELEMENT_OF_REPR%}",
      tabela
    );
  }
  return templateRetornado;
};
const retornarOverview = function (req, res) {
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  // const imagemHome = `${__dirname}/img/defesa_civil_repr.png`;
  const imagemHome = `http://localhost:8005/public/img/defesa_civil_repr.png`;
  const imagemRetorno = `<img src='${imagemHome}'alt='imagem_defesa_civil'</img>`;
  const retorno = replaceTemplate(tempOverview, imagemRetorno);
  //console.log(retorno);
  res.end(retorno);
};
// Elementos de retorno
// arquivos
const nomes = fileSystem
  .readFileSync(`${__dirname}/arquivos/nomes.txt`, "utf-8")
  .split("\n");
const ids = fileSystem
  .readFileSync(`${__dirname}/arquivos/ids.txt`, "utf-8")
  .split("\n");
const nivelUrgencia = fileSystem
  .readFileSync(`${__dirname}/arquivos/nivel_urgencia.txt`, "utf-8")
  .split("\n");
const statusR = fileSystem
  .readFileSync(`${__dirname}/arquivos/status.txt`, "utf-8")
  .split("\n");
const placasVeiculos = fileSystem
  .readFileSync(`${__dirname}/arquivos/placas_veiculos.txt`, "utf-8")
  .split("\n");

// Criação de arquivo JSON
criarArquivoJSON(nomes, ids, statusR, nivelUrgencia, placasVeiculos);

// templates
const tempRoubados = fileSystem.readFileSync(
  `${__dirname}/templates/template-roubados.html`,
  "utf-8"
);
const tempIrregulares = fileSystem.readFileSync(
  `${__dirname}/templates/template-irregulares.html`,
  "utf-8"
);
const tempInfracao = fileSystem.readFileSync(
  `${__dirname}/templates/template-infracao.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

// Obter conteúdo do arquivo JSON
const data = fileSystem.readFileSync(`${__dirname}/JSON/data.json`, "utf-8");
const dataObject = JSON.parse(data);
// Server
app.get("/", (req, res) => {
  retornarOverview(req, res);
  //console.log(dataObject);
});
app.get("/home", (req, res) => {
  retornarOverview(req, res);
});
app.get("/veiculos_roubados", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempRoubados, dataObject);
  res.end(retorno);
});
app.get("/veiculos_irregulares", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempIrregulares, dataObject);
  res.end(retorno);
});
app.listen(8005, () => {
  console.log("Listening to request on port 8005");
});
// const server = http.createServer((req, resp) => {
//   const { query, pathname } = url.parse(req.url, true);

//   if (pathname === "/" || pathname === "/home") {
//     resp.writeHead(200, {
//       "Content-type": "text/html",
//     });
//     const imagemHome = `http://localhost:8005/public/img/defesa_civil_repr.png`;
//     const imagemRetorno = `<img src='${imagemHome}'alt='imagem_defesa_civil'>`;
//     const retorno = replaceTemplate(tempOverview, imagemRetorno);
//     console.log(retorno);
//     resp.end(retorno);
//   }
// });

// server.listen(8005, "127.0.0.1", () => {
//   console.log("Listening to request on port 8005");
// });
