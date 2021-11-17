const queryPromise = require("../helpers/queryPromise");
const queryPorIdPromise = require("../helpers/queryPorIdPromise");

class VeiculosRoubados {
  async pegarDados() {
    const sql =
      "SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia, v.local_roubo, v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_roubados AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async buscarPorPlaca(placa) {
    const sql = `SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia, v.local_roubo, v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_roubados AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE placa = '${placa}'`;
    const dados = await queryPorIdPromise(sql);
    return [].concat(dados);
  }
}

module.exports = new VeiculosRoubados();
