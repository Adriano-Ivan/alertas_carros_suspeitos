"use strict";
// Recursos
const customExpress = require("./config/customExpress");
//const socketAux = require("./config/webSocketAux");
const dotenv = require("dotenv");
const conexao = require("./infraestrutura/conexao").conexao;
// const instanceEvents = require("./infraestrutura/conexao").instancia;
const Tabelas = require("./infraestrutura/tabelas");
const monitorSocket = require("./helpers/monitorSocket");
const socketIO = require("socket.io");
//const uws = require("uws");

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
    //io.ws = new uws.Server({ perMessageDeflate: false });
    app.listen(process.env.PORT, () => {
      console.log("Listening to request on port 8006");
    });

    io.on("connection", (socket) => {
      //console.log("NOVA CONEXÃO: " + socket.id);
      monitorSocket(socket);
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
