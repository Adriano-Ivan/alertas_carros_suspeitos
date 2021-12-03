"use strict";
// Recursos
const customExpress = require("./config/customExpress");
//const socketAux = require("./config/webSocketAux");
const dotenv = require("dotenv");
const conexao = require("./infraestrutura/conexao").conexao;
const instanceEvents = require("./infraestrutura/conexao").instancia;
const Tabelas = require("./infraestrutura/tabelas");
const helperSocket = require("./helpers/alertSocket");
const socketIO = require("socket.io");
// const ZongJi = require("zongji");
// let zongji = new ZongJi({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
// });

// // Each change to the replication log results in an event
// zongji.on("binlog", function (evt) {
//   evt.dump();
// });

// // Binlog must be started, optionally pass in filters
// zongji.start({
//   includeEvents: ["tablemap", "writerows", "updaterows", "deleterows"],
// });
//const wss = require("socket.io");

// Variável de ambiente
dotenv.config();
// Server - connect to database
conexao.connect((erro) => {
  if (erro) {
    console.log("ERRO:" + erro);
  } else {
    console.log("Conectado ao database com sucesso");
    Tabelas.init(conexao);

    const app = customExpress();
    // const app = customExpress();
    const io = socketIO(app);

    app.listen(process.env.PORT, () => {
      console.log("Listening to request on port 8005");
    });

    io.on("connection", (socket) => {
      console.log("Conexão detectada...");
      socket.on("request_alert", (confirm) => {
        //console.log(confirm, typeof confirm);
        if (confirm) {
          socket.emit("send_alerts", helperSocket.pegarAlertas());
        }
      });
    });
  }
});

// Recordação
// const fileSystem = require("fs");
//const criarArquivoJSON = require("./modules/criarArquivoJSON");
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

// const http = require("http");
// const url = require("url");

// Elementos de retorno
// arquivos
// const nomes = fileSystem
//   .readFileSync(`${__dirname}/arquivos/nomes.txt`, "utf-8")
//   .split("\n");
// const ids = fileSystem
//   .readFileSync(`${__dirname}/arquivos/ids.txt`, "utf-8")
//   .split("\n");
// const nivelUrgencia = fileSystem
//   .readFileSync(`${__dirname}/arquivos/nivel_urgencia.txt`, "utf-8")
//   .split("\n");
// const statusR = fileSystem
//   .readFileSync(`${__dirname}/arquivos/status.txt`, "utf-8")
//   .split("\n");
// const placasVeiculos = fileSystem
//   .readFileSync(`${__dirname}/arquivos/placas_veiculos.txt`, "utf-8")
//   .split("\n");

// Criação de arquivo JSON
// criarArquivoJSON(nomes, ids, statusR, nivelUrgencia, placasVeiculos);
