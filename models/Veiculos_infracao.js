const queryPromise = require("../helpers/queryPromise");
const queryPorIdPromise = require("../helpers/queryPorIdPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");
class VeiculosInfracao {
  async pegarDados() {
    const sql =
      "SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia, v.local_alerta, v.gravidade_infracao, DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_infracao AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarDadosPorId(id) {
    const sql =
      "SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia,v.gravidade_infracao,v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_infracao AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE v.id = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorPlaca(placa) {
    const sql = `SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia, v.local_roubo, v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_infracao AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE placa = '${placa}'`;
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async inserirRegistro(objeto) {
    const sql = "INSERT INTO veiculos_infracao SET ?";
    await insertPromise(sql, objeto);
  }
  async updateRegistro(objeto, id) {
    console.log(objeto, id);
    const sql = "UPDATE veiculos_infracao SET ? WHERE id = ?";
    await updatePromise(id, objeto, sql);
  }
  async deletarRegistro(id) {
    const sql = "DELETE FROM veiculos_infracao WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new VeiculosInfracao();
