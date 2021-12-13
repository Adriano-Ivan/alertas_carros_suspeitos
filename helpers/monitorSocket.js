const helperSocket = require("./alertSocket");

let idReference = "";

const emitAsync = async (sock) => {
  sock.emit("send_alerts", helperSocket.pegarAlertas());
};
const emitAsyncTelegram = async (helpersTelegram) => {
  helperSocket.enviarMensagemParaTelegram(
    helpersTelegram[0],
    parseInt(helpersTelegram[1]),
    parseInt(helpersTelegram[2])
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

  socket.on("send_message", async (message) => {
    await emitMessageAsync(message);
  });
  // socket.on("signal_close", (id_user) => {
  //   console.log(id_user);
  //   console.log("DISCONNECT");
  // });
  socket.on("send_object_for_telegram", async (helpersTelegram) => {
    console.log(helpersTelegram);

    await emitAsyncTelegram(helpersTelegram);

    //helperSocket.enviarMensagemParaTelegram(objeto[0]);
  });
};
