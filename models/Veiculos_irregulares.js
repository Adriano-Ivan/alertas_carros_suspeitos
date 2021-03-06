const queryPromise = require("../helpers/queryPromise");
const queryPorIdPromise = require("../helpers/queryPorIdPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");

class VeiculosIrregulares {
  async pegarDados(id_zona) {
    //this.id_zona = id_zona;
    const sql =
      "SELECT v.id,v.dono, v.placa, v.id_ultimo_editor,v.id_zona, s.status, n.nivel_urgencia, v.local_alerta, v.medida_administrativa,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE v.id_zona = ? ORDER BY momento_alerta DESC;";
    const dados = await queryPromise2(id_zona, sql);
    return [].concat(dados);
  }
  async pegarDadosAlerta() {
    const sql =
      "SELECT v.id,v.placa,v.local_alerta,v.alertado,v.id_zona,'irregular' as tipo, DATE_FORMAT(DATE(momento_alerta),'%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID WHERE v.alertado = false and s.status != 'Resolvido' ORDER BY momento_alerta DESC;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarDadosPorId(id) {
    const sql =
      "SELECT v.id,v.dono, v.placa,v.id_ultimo_editor, v.id_zona, s.status, n.nivel_urgencia,v.medida_administrativa,v.local_alerta,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE v.id = ? ORDER BY momento_alerta DESC;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorPlaca(placa) {
    const sql = `SELECT v.id,v.dono, v.placa, v.id_ultimo_editor, s.status, n.nivel_urgencia, v.local_alerta, v.medida_administrativa,DATE_FORMAT(DATE(momento_alerta), '%d/%m/%Y') as data, time(v.momento_alerta) as hora FROM veiculos_irregulares AS v INNER JOIN status AS s ON s.id = v.statusID INNER JOIN nivel_urgencia AS n ON v.nivel_urgenciaID = n.id WHERE placa = '${placa} ORDER BY data DESC'`;
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
    const sql2 =
      "UPDATE veiculos_irregulares SET alertado = false WHERE id = ?";
    await queryPromise2(id, sql2);
    await updatePromise(id, objeto, sql);
  }
  async updateUltimoEditor(id_veiculo, id_usuario) {
    const sql =
      "UPDATE veiculos_irregulares SET id_ultimo_editor = ? WHERE id = ?";
    await updatePromise(id_veiculo, id_usuario, sql);
  }
  async updateAlertado(id) {
    const sql = "UPDATE veiculos_irregulares SET alertado = ? WHERE id = ?";
    await updatePromise(parseInt(id), true, sql);
  }
  async deletarRegistro(id) {
    const sql = "DELETE FROM veiculos_irregulares WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new VeiculosIrregulares();
