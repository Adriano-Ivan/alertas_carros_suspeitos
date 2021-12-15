//const { Socket } = require("socket.io");
const helperSocket = require("./alertSocket");

//let idReference = "";
let numConnectedUsers = 0;
let numeroEnvios = 0;
let listConnectedUsers = [];
const emitAsync = async (sock) => {
  sock.emit("send_alerts", helperSocket.pegarAlertas());
};
const updateListAsync = async (l, socket) => {
  return l.filter((u) => u !== socket.id);
};
const emitAsyncTelegram = async (
  helpersTelegram,
  id_zona,
  firstIDList,
  senderID
) => {
  await helperSocket.enviarMensagemParaTelegram(
    helpersTelegram,
    id_zona,
    firstIDList,
    senderID
  );
};
const emitMessageAsync = async (message) => {
  await helperSocket.inserirMensagem(message);
};
module.exports = (socket) => {
  console.log("Conexão detectada...");
  socket.on("request_alert", async (b) => {
    //console.log(confirm, typeof confirm);

    await emitAsync(socket);
  });

  socket.on("emit_flag_connected", (id_socket) => {
    if (!listConnectedUsers.includes(id_socket)) {
      listConnectedUsers.push(id_socket);
      listConnectedUsers = listConnectedUsers.filter(
        (u, i) => listConnectedUsers.indexOf(u) === i
      );
      numConnectedUsers++;
    }
    console.log(listConnectedUsers);
    console.log(numConnectedUsers);
    console.log("EMIT FLAG CONNNECTED");
  });
  socket.on("disconnect", async () => {
    numConnectedUsers--;
    listConnectedUsers = await updateListAsync(listConnectedUsers, socket);
    console.log(socket.id);
    console.log("DISCONNECT EVENT");
    console.log(numConnectedUsers);
    console.log(listConnectedUsers);
    console.log("DISCONNECT EVENT");
  });
  socket.on("send_message", async (message) => {
    await emitMessageAsync(message);
  });
  // socket.on("signal_close", (id_user) => {
  //   console.log(id_user);
  //   console.log("DISCONNECT");
  // });
  socket.on("send_to_telegram", async (retorno) => {
    numeroEnvios = parseInt(retorno.numero_envios);
    //console.log(helpersTelegram);
    //console.log(connectedUsers, numeroEnvios);
    const conf = await emitAsyncTelegram(
      retorno.objeto_para_telegram,
      retorno.id_zona,
      listConnectedUsers[0],
      retorno.socket_id
    );
    console.log(conf);
    console.log("TESTE - ------------------ ENTROU *******");
    socket.emit("conf_update", true);
  });
};
