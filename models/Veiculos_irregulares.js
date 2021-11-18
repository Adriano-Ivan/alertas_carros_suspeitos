const queryPromise = require("../helpers/queryPromise");
const queryPorIdPromise = require("../helpers/queryPorIdPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");

class VeiculosIrregulares {
  async pegarDados() {
    const sql =
      "SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia, v.local_alerta, v.medida_administrativa,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarDadosPorId(id) {
    const sql =
      "SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia,v.medida_administrativa,v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE v.id = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorPlaca(placa) {
    const sql = `SELECT v.id,v.dono, v.placa, s.status, n.nivel_urgencia, v.local_alerta, v.medida_administrativa,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE placa = '${placa}'`;
    const dados = await queryPorIdPromise(sql);
    return [].concat(dados);
  }
  async inserirRegistro(objeto) {
    const sql = "INSERT INTO veiculos_irregulares SET ?";
    await insertPromise(sql, objeto);
  }
  async updateRegistro(objeto, id) {
    console.log(objeto, id);
    const sql = "UPDATE veiculos_irregulares SET ? WHERE id = ?";
    await updatePromise(id, objeto, sql);
  }
  async deletarRegistro(id) {
    const sql = "DELETE FROM veiculos_irregulares WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new VeiculosIrregulares();
