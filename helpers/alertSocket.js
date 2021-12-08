const listaVeiculosInfracao = require("./../models/Veiculos_infracao");
const listaVeiculosIrregulares = require("./../models/Veiculos_irregulares");
const listaVeiculosRoubados = require("./../models/Veiculos_roubados");
const listaVeiculosSuspeitos = require("./../models/Veiculos_suspeitos");
const mensagensRecebidas = require("./../models/Mensagens_recebidas");
const usuario = require("./../models/Usuario");
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

let dados = [];
exports.pegarAlertas = (id_zona) => {
  //console.log(id_zona);
  listaVeiculosSuspeitos
    .pegarDadosAlerta(id_zona)
    .then((listagem) => {
      dados = [];
      dados = dados.concat(listagem);
      return encontrarMaior(listagem);
    })
    .then((m) => {
      listaVeiculosSuspeitos.updateAlertado(m);
    })
    .then(() => {
      listaVeiculosRoubados
        .pegarDadosAlerta(id_zona)
        .then((listagem) => {
          dados = dados.concat(listagem);
          return encontrarMaior(listagem);
        })
        .then((m) => {
          listaVeiculosRoubados.updateAlertado(m);
        });
    })
    .then(() => {
      listaVeiculosInfracao
        .pegarDadosAlerta(id_zona)
        .then((listagem) => {
          dados = dados.concat(listagem);
          return encontrarMaior(listagem);
        })
        .then((m) => {
          listaVeiculosInfracao.updateAlertado(m);
        });
    })
    .then(() => {
      listaVeiculosIrregulares
        .pegarDadosAlerta(id_zona)
        .then((listagem) => {
          dados = dados.concat(listagem);
          return encontrarMaior(listagem);
        })
        .then((m) => {
          listaVeiculosIrregulares.updateAlertado(m);
        });
    });

  //console.log(dados);
  if (dados.length === 0) {
    return null;
  }
  return dados;
};

exports.enviarMensagemParaTelegram = (alertas) => {
  zonas.pegarDados().then((listagem) => {
    botModel.pegarDados().then((listagemBots) => {
      listagemBots.forEach((b) => {
        const bot = new TelegramBot(b.token_telegram, { polling: true });

        listagem.forEach((z) => {
          let mensagem = "⚠️ ALERTAS RECENTES ⚠️\n\n";
          let entrou = false;
          alertas.forEach((a, i) => {
            if (b.id_zona === z.id && z.id === a.id_zona) {
              entrou = true;
              mensagem += `\n➡️ Placa: ${a.placa}\n➡️ Momento: ${a.hora} - ${a.data} \n➡️ Local específico: ${a.local_alerta} \n➡️ Tipo: ${a.tipo}\n\n`;
              if (i < alertas.length - 1) {
                mensagem += `🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻\n`;
              }
            }
          });
          if (entrou) {
            bot.sendMessage(b.chat_id, mensagem);
            //bot.sendMessage("@Adriano_2000", mensagem);
          }
        });

        // listagem.forEach((u) => {
        //   if (u.id_zona === b.id_zona) {
        //     console.log(u, b, alertas);
        //     bot.sendMessage(b.chat_id, mensagemCompleta);
        //   }
        // });
      });
    });
  });
};

exports.inserirMensagem = (mensagem) => {
  mensagensRecebidas.inserirMensagemParaTodosOsUsuarios(mensagem);
};
