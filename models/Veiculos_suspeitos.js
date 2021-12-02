const queryPromise = require("../helpers/queryPromise");
const queryPorIdPromise = require("../helpers/queryPorIdPromise");
const insertPromise = require("../helpers/insertPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");

class VeiculosSuspeitos {
  async pegarDados() {
    const sql =
      "SELECT v.id,v.dono, v.placa,v.id_ultimo_editor,  s.status, n.nivel_urgencia, v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_suspeitos AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id ORDER BY v.momento_alerta DESC;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarDadosPorId(id) {
    const sql =
      "SELECT v.id,v.dono, v.placa, v.id_ultimo_editor, s.status, n.nivel_urgencia, v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_suspeitos AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE v.id = ? ORDER BY v.momento_alerta DESC;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorPlaca(placa) {
    const sql = `SELECT v.id,v.dono, v.placa,v.id_ultimo_editor,  s.status, n.nivel_urgencia, v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y')as data, time(v.momento_alerta) as hora FROM veiculos_suspeitos AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE placa = '${placa}' ORDER BY momento_alerta DESC;`;
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async inserirRegistro(objeto) {
    const sql = "INSERT INTO veiculos_suspeitos SET ?";
    await insertPromise(sql, objeto);
  }
  async updateRegistro(objeto, id) {
    console.log(objeto, id);
    const sql = "UPDATE veiculos_suspeitos SET ? WHERE id = ?";
    await updatePromise(id, objeto, sql);
  }
  async updateUltimoEditor(id_veiculo, id_usuario) {
    const sql =
      "UPDATE  veiculos_suspeitos SET id_ultimo_editor = ? WHERE id = ?";
    await updatePromise(id_veiculo, id_usuario, sql);
  }
  async updateAlertado(id) {
    const sql = "UPDATE veiculos_suspeitos SET alertado = ? WHERE id = ?";
    await updatePromise(id, true, sql);
  }
  async deletarRegistro(id) {
    const sql = "DELETE FROM veiculos_suspeitos WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new VeiculosSuspeitos();
