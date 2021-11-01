const queryPromise = require("../modules/queryPromise");
const queryPorIdPromise = require("../modules/queryPorIdPromise");

class veiculosIrregulares {
  async pegarDados() {
    const sql =
      "SELECT v.dono, v.placa, s.status, n.nivel_urgencia, v.local_alerta, v.medida_administrativa FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async buscarPorPlaca(placa) {
    const sql = `SELECT v.dono, v.placa, s.status, n.nivel_urgencia, v.local_alerta, v.medida_administrativa FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE placa = '${placa}'`;
    const dados = await queryPorIdPromise(sql);
    return [].concat(dados);
  }
}

module.exports = new veiculosIrregulares();
