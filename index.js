"use strict";
// Recursos
const fileSystem = require("fs");
const customExpress = require("./config/customExpress");
const sequelize = require("./infraestrutura/sequelize");
const Tabelas = require("./infraestrutura/tabelas");
const criarArquivoJSON = require("./modules/criarArquivoJSON");

// const http = require("http");
// const url = require("url");

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

// Server - connect to database
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao database com sucesso");
    Tabelas.init(sequelize);
    const app = customExpress();
    app.listen(8005, () => {
      console.log("Listening to request on port 8005");
    });
  })
  .catch((error) => {
    console.log("ERRO:" + error);
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
