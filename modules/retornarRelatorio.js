module.exports = (dadosRelatorio, retornoRelatorio) => {
  rRelatorio = retornoRelatorio;
  rRelatorio +=
    "<h4>Há casos que requerem sua atenção !</h4><ul class='lista-relatorio'>";
  for (arr of dadosRelatorio) {
    for (obj of arr) {
      if (
        Object.keys(obj).includes("status_roubados") &&
        Object.keys(obj).includes("vezes_roubados")
      ) {
        if (obj["status_roubados"] !== "Resolvido") {
          rRelatorio += `<li>* ${obj["vezes_roubados"]} veículo${
            obj["vezes_roubados"] > 1 ? "s" : ""
          } roubados com status ${obj["status_roubados"]}</li>`;
        }
      }
      if (
        Object.keys(obj).includes("status_irregulares") &&
        Object.keys(obj).includes("vezes_irregulares")
      ) {
        if (obj["status_irregulares"] !== "Resolvido") {
          rRelatorio += `<li>* ${obj["vezes_irregulares"]} veículo${
            obj["vezes_irregulares"] > 1 ? "s" : ""
          } em estado irregular com status ${obj["status_irregulares"]}</li>`;
        }
      }
      if (
        Object.keys(obj).includes("status_infracao") &&
        Object.keys(obj).includes("vezes_infracao")
      ) {
        if (obj["status_infracao"] !== "Resolvido") {
          rRelatorio += `<li>* ${obj["vezes_infracao"]} veículo${
            obj["vezes_infracao"] > 1 ? "s" : ""
          } com infração pendente com status ${obj["status_infracao"]}</li>`;
        }
      }
      if (
        Object.keys(obj).includes("status_suspeitos") &&
        Object.keys(obj).includes("vezes_suspeitos")
      ) {
        if (obj["status_suspeitos"] !== "Resolvido") {
          rRelatorio += `<li>* ${obj["vezes_suspeitos"]} veículo${
            obj["vezes_suspeitos"] > 1 ? "s" : ""
          } suspeito${obj["vezes_suspeitos"] > 1 ? "s" : ""} com status ${
            obj["status_suspeitos"]
          }</li>`;
        }
      }
    }
  }
  rRelatorio += "</ul>";
  rRelatorio += "<h5>Por favor, consulte a aba de alertas !</h5>";
  return rRelatorio;
};
