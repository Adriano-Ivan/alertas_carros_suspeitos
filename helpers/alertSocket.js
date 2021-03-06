const listaVeiculosInfracao = require("./../models/Veiculos_infracao");
const listaVeiculosIrregulares = require("./../models/Veiculos_irregulares");
const listaVeiculosRoubados = require("./../models/Veiculos_roubados");
const listaVeiculosSuspeitos = require("./../models/Veiculos_suspeitos");
const mensagensRecebidas = require("./../models/Mensagens_recebidas");
const usuarios = require("./../models/Usuario");
const zonas = require("./../models/Zonas");
const botModel = require("./../models/Bot");
//const userInformation = require("./Passport").pegarUsuario();

const TelegramBot = require("node-telegram-bot-api");
const encontrarMaior = (objs) => {
  if (objs.length > 0) {
    //console.log(objs);
  }

  let m = 1;
  objs.forEach((obj) => {
    if (obj["id"] > m) {
      m = obj["id"];
    }
  });
  return m;
};
const atualizarAlertados = async (alertas) => {
  for (let a of alertas) {
    console.log("TESTE - ATUALZIZOU");
    if (a.tipo === "infracao") {
      await listaVeiculosInfracao.updateAlertado(a.id);
    }
    if (a.tipo === "roubado") {
      await listaVeiculosRoubados.updateAlertado(a.id);
    }
    if (a.tipo === "irregular") {
      await listaVeiculosIrregulares.updateAlertado(a.id);
    }
    if (a.tipo === "suspeito") {
      await listaVeiculosSuspeitos.updateAlertado(a.id);
    }
  }
  return true;
};
const partialBuildingForEach = async (alertas, b, a, id_zona, mensagem, i) => {
  if (b.id_zona === id_zona && id_zona === a.id_zona) {
    mensagem += `\n➡️ Placa: ${a.placa}\n➡️ Momento: ${a.hora} - ${a.data} \n➡️ Local específico: ${a.local_alerta} \n➡️ Tipo: ${a.tipo}\n\n`;
    if (i < alertas.length - 1) {
      mensagem += `🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻\n`;
    }
    return mensagem;
  } else {
    return "";
  }
};
const auxiliarPartial = async (alertas, b, id_zona) => {
  let entrou = false;
  let mensagem = "";
  const bt = b[0];
  const bot = new TelegramBot(bt.token_telegram, { polling: true });

  if (bot !== null) {
    if (alertas.length > 0) {
      entrou = true;
      mensagem = "⚠️ ALERTAS RECENTES ⚠️\n\n";
    }

    console.log("TESTE-----------");
    let i = 0;
    for (let a of alertas) {
      mensagem = await partialBuildingForEach(
        alertas,
        bt,
        a,
        id_zona,
        mensagem,
        i
      );
      i++;
    }
  }
  return { mensagem, entrou, bot, b_chatId: bt.chat_id };
};
const partialBuildingFor = async (alertas, id_zona, id_usuario) => {
  //let mensagem = "";
  //let auxiliarObjeto = null;

  console.log("EITAAAAAAAAAAAAAAA - pegar bot");
  const bot = await botModel.pegarDadosPorUsuarioEzona(id_zona, id_usuario);
  console.log(bot);
  const auxiliarObjeto = await auxiliarPartial(alertas, bot, id_zona);
  // const listagemBots = await botModel.pegarDados();
  // console.log(listagemBots);
  // for (const b of listagemBots) {
  //   console.log(b);
  //   console.log(id_zona);
  //   console.log(b.id_zona === parseInt(id_zona));
  //   if (b.id_zona === parseInt(id_zona)) {
  //     console.log("ENTROUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
  //     auxiliarObjeto = await auxiliarPartial(alertas, b, id_zona);
  //   }
  // }
  console.log(auxiliarObjeto.mensagem + "  MENSAGEMMMMMMMMMMM");
  return {
    entrou: auxiliarObjeto.entrou,
    bot: auxiliarObjeto.bot,
    mensagem: auxiliarObjeto.mensagem,
    b_chatId: auxiliarObjeto.b_chatId,
  };
};
const buildingMessagesAsync = async (alertas, id_zona, id_usuario) => {
  const objetoBuilding = await partialBuildingFor(alertas, id_zona, id_usuario);
  console.log("TESTE");
  //console.log(objetoBuilding);
  if (objetoBuilding.entrou) {
    console.log("TESTE++++++++++++++++++++#333333333");
    objetoBuilding.bot.sendMessage(
      objetoBuilding.b_chatId,
      objetoBuilding.mensagem
    );
    const conf = await atualizarAlertados(alertas);

    if (conf) {
      return objetoBuilding.entrou;
    }
  }
  return objetoBuilding.entrou;
};

let dados = [];
exports.pegarAlertas = () => {
  //console.log(id_zona);
  listaVeiculosSuspeitos
    .pegarDadosAlerta()
    .then((listagem) => {
      dados = [];
      dados = dados.concat(listagem);
    })
    .then(() => {
      listaVeiculosRoubados.pegarDadosAlerta().then((listagem) => {
        dados = dados.concat(listagem);
      });
    })
    .then(() => {
      listaVeiculosInfracao.pegarDadosAlerta().then((listagem) => {
        dados = dados.concat(listagem);
      });
    })
    .then(() => {
      listaVeiculosIrregulares.pegarDadosAlerta().then((listagem) => {
        dados = dados.concat(listagem);
      });
    });
  //console.log(dados);
  if (dados.length === 0) {
    return null;
  }
  return dados;
};
let referencia = "";
exports.enviarMensagemParaTelegram = async (
  alertas,
  numeroEnvios,
  id_zona,
  firstID,
  senderID,
  id_usuario
) => {
  //console.log(id_user, "+++++++++++++");
  // console.log(id_zona, "++++++++++++");
  console.log(firstID, senderID);
  if (firstID === senderID && numeroEnvios === 1) {
    const conf = await buildingMessagesAsync(
      alertas,
      id_zona,
      parseInt(id_usuario)
    );
    console.log(conf);
    if (conf) {
      return true;
    }
    return false;
  }
  // process.once("SIGINT", () => bot.stop("SIGINT"));
  // process.once("SIGTERM", () => bot.stop("SIGTERM"));
};

exports.inserirMensagem = async (mensagem) => {
  await mensagensRecebidas.inserirMensagemParaTodosOsUsuarios(mensagem);
};
