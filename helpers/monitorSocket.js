//const { Socket } = require("socket.io");
const helperSocket = require("./alertSocket");

//let idReference = "";
let connectedUsers = 0;
let numeroEnvios = 0;
let listConnectedUsers = [];
const emitAsync = async (sock) => {
  sock.emit("send_alerts", helperSocket.pegarAlertas());
};
const emitAsyncTelegram = async (helpersTelegram, id_zona, connU, ne) => {
  await helperSocket.enviarMensagemParaTelegram(
    helpersTelegram,
    id_zona,
    connU,
    ne
  );
};
const emitMessageAsync = async (message) => {
  helperSocket.inserirMensagem(message);
};
module.exports = (socket) => {
  console.log("Conexão detectada...");
  socket.on("request_alert", async (b) => {
    //console.log(confirm, typeof confirm);

    await emitAsync(socket);
  });

  socket.on("flag_connect", (id_user) => {
    console.log("FLAG_CONNECT");
    if (!listConnectedUsers.includes(parseInt(id_user))) {
      connectedUsers++;
      listConnectedUsers.push(id_user);
    }
    console.log(listConnectedUsers);
    console.log(connectedUsers);
    console.log("FLAG_CONNECT");
  });
  socket.on("disconnect", () => {
    connectedUsers--;
    console.log("DISCONNECT EVENT");
    console.log(connectedUsers);

    console.log("DISCONNECT EVENT");
  });
  socket.on("send_message", async (message) => {
    await emitMessageAsync(message);
  });
  // socket.on("signal_close", (id_user) => {
  //   console.log(id_user);
  //   console.log("DISCONNECT");
  // });
  socket.on("numero_envios", async (retorno) => {
    numeroEnvios = parseInt(retorno.numero_envios);
    //console.log(helpersTelegram);
    console.log(connectedUsers, numeroEnvios);
    const conf = await emitAsyncTelegram(
      retorno.objeto_para_telegram,
      retorno.id_zona,
      connectedUsers,
      numeroEnvios
    );

    console.log("TESTE - ------------------ ENTROU *******");
    socket.emit("conf_update", true);
  });
  socket.on("send_object_for_telegram", async (helpersTelegram) => {
    //helperSocket.enviarMensagemParaTelegram(objeto[0]);
  });
};
