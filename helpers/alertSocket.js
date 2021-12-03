const listaVeiculosInfracao = require("./../models/Veiculos_infracao");
const listaVeiculosIrregulares = require("./../models/Veiculos_irregulares");
const listaVeiculosRoubados = require("./../models/Veiculos_roubados");
const listaVeiculosSuspeitos = require("./../models/Veiculos_suspeitos");

const encontrarMaior = (objs) => {
  if (objs.length > 0) {
    console.log(objs);
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
exports.pegarAlertas = () => {
  listaVeiculosSuspeitos
    .pegarDadosAlerta()
    .then((listagem) => {
      dados = dados.concat(listagem);
      return encontrarMaior(listagem);
    })
    .then((m) => {
      listaVeiculosSuspeitos.updateAlertado(m);
    })
    .then(() => {
      listaVeiculosRoubados
        .pegarDadosAlerta()
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
        .pegarDadosAlerta()
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
        .pegarDadosAlerta()
        .then((listagem) => {
          dados = dados.concat(listagem);
          return encontrarMaior(listagem);
        })
        .then((m) => {
          listaVeiculosIrregulares.updateAlertado(m);
        });
    });

  return dados;
};
