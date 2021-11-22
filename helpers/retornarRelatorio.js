const montarLista = (dadosRelatorio, igual, igual2) => {
  let m = [];
  for (arr of dadosRelatorio) {
    for (obj of arr) {
      if (
        Object.keys(obj).includes("status_roubados") &&
        Object.keys(obj).includes("vezes_roubados")
      ) {
        if (
          obj["status_roubados"] === igual ||
          obj["status_roubados"] === igual2
        ) {
          // m += `<li>* ${obj["vezes_roubados"]} veículo${
          //   obj["vezes_roubados"] > 1 ? "s" : ""
          // } roubados com status ${obj["status_roubados"]}</li>`;
          m.push(
            `* ${obj["vezes_roubados"]} veículo${
              obj["vezes_roubados"] > 1 ? "s" : ""
            } roubado${obj["vezes_roubados"] > 1 ? "s" : ""} com status ${
              obj["status_roubados"]
            }`
          );
        }
      }
      if (
        Object.keys(obj).includes("status_irregulares") &&
        Object.keys(obj).includes("vezes_irregulares")
      ) {
        if (
          obj["status_irregulares"] === igual ||
          obj["status_irregulares"] === igual2
        ) {
          // m += `<li>* ${obj["vezes_irregulares"]} veículo${
          //   obj["vezes_irregulares"] > 1 ? "s" : ""
          // } em estado irregular com status ${obj["status_irregulares"]}</li>`;
          m.push(
            `* ${obj["vezes_irregulares"]} veículo${
              obj["vezes_irregulares"] > 1 ? "s" : ""
            } em estado irregular com status ${obj["status_irregulares"]}`
          );
        }
      }
      if (
        Object.keys(obj).includes("status_infracao") &&
        Object.keys(obj).includes("vezes_infracao")
      ) {
        if (
          obj["status_infracao"] === igual ||
          obj["status_infracao"] === igual2
        ) {
          // m += `<li>* ${obj["vezes_infracao"]} veículo${
          //   obj["vezes_infracao"] > 1 ? "s" : ""
          // } da situação infração pendente com status ${
          //   obj["status_infracao"]
          // }</li>`;
          m.push(
            `* ${obj["vezes_infracao"]} veículo${
              obj["vezes_infracao"] > 1 ? "s" : ""
            } da situação infração pendente com status ${
              obj["status_infracao"]
            }`
          );
        }
      }
      if (
        Object.keys(obj).includes("status_suspeitos") &&
        Object.keys(obj).includes("vezes_suspeitos")
      ) {
        if (
          obj["status_suspeitos"] === igual ||
          obj["status_suspeitos"] === igual2
        ) {
          // m += `<li>* ${obj["vezes_suspeitos"]} veículo${
          //   obj["vezes_suspeitos"] > 1 ? "s" : ""
          // } suspeito${obj["vezes_suspeitos"] > 1 ? "s" : ""} com status ${
          //   obj["status_suspeitos"]
          // }</li>`;
          m.push(
            `* ${obj["vezes_suspeitos"]} veículo${
              obj["vezes_suspeitos"] > 1 ? "s" : ""
            } suspeito${obj["vezes_suspeitos"] > 1 ? "s" : ""} com status ${
              obj["status_suspeitos"]
            }`
          );
        }
      }
    }
  }
  return m;
};

module.exports = (dadosRelatorio) => {
  // let rRelatorio = retornoRelatorio;
  // rRelatorio +=
  //   "<h4>Há casos que requerem sua atenção !</h4><ul class='lista-relatorio'>";
  const rRelatorio = montarLista(
    dadosRelatorio,

    "Em andamento",
    "A confirmar"
  );
  console.log(rRelatorio);
  // rRelatorio += "</ul>";
  // rRelatorio += "<h5>Por favor, consulte a aba de alertas !</h5>";
  // let rRelatorio2 = "<h4>Casos resolvidos</h4><ul class='lista-relatorio'>";
  const rRelatorio2 = montarLista(dadosRelatorio, "Resolvido", "Resolvido");
  // rRelatorio2 += "</ul>";
  console.log(rRelatorio2);
  return [rRelatorio, rRelatorio2];
};
