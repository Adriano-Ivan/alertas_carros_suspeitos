const queryPromise = require("../modules/queryPromise");
const queryPorIdPromise = require("../modules/queryPorIdPromise");
const updatePromise = require("../modules/updatePromise");

class veiculosRoubados {
  async pegarDados() {
    const sql =
      "SELECT v.dono, v.placa, s.status, n.nivel_urgencia, v.local_roubo, v.local_alerta FROM veiculos_roubados AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async buscarPorId(id) {
    const sql = `SELECT * FROM observacoes_pertinentes WHERE id = ${id}`;
    const dados = await queryPorIdPromise(sql);
    return [].concat(dados);
  }
}

module.exports = new veiculosRoubados();
