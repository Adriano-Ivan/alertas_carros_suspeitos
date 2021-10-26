// Recursos
const fileSystem = require("fs");
const express = require("express");
const app = express();
const replaceTemplate = require("./modules/replaceTemplate");
const criarArquivoJSON = require("./modules/criarArquivoJSON");
const retornarOverview = require("./modules/retornarOverview");
app.use("/public", express.static(__dirname + `/public`));
const http = require("http");
const url = require("url");
//const { ESRCH } = require("constants");

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
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
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
const tempAfazeres = fileSystem.readFileSync(
  `${__dirname}/templates/template-afazeres.html`,
  "utf-8"
);
const tempObservacoes = fileSystem.readFileSync(
  `${__dirname}/templates/template-observacoes.html`,
  "utf-8"
);
// Obter conteúdo do arquivo JSON
const data = fileSystem.readFileSync(`${__dirname}/JSON/data.json`, "utf-8");
const dataObject = JSON.parse(data);
// Server
app.get("/", (req, res) => {
  retornarOverview(req, res, tempOverview);
  //console.log(dataObject);
});
app.get("/home", (req, res) => {
  retornarOverview(req, res, tempOverview);
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
app.get("/veiculos_infracao", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempInfracao, dataObject);
  res.end(retorno);
});
app.get("/lista_afazeres", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempAfazeres);
  res.end(retorno);
});
app.listen(8005, () => {
  console.log("Listening to request on port 8005");
});
app.get("/observacoes_pertinentes", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  const retorno = replaceTemplate(tempOverview, tempObservacoes);
  res.end(retorno);
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
