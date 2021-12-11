const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");
class Zonas {
  async pegarDados(id) {
    const sql = "SELECT * FROM zonas;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarDadosPorId(id) {
    const sql = "SELECT * FROM zonas WHERE id = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao) {
    const sql = `SELECT * FROM zonas WHERE zona
             LIKE ?`;
    const dados = await queryPromise2(descricao + "%", sql);
    return [].concat(dados);
  }
  async findZonaById(id) {
    const sql = `SELECT * FROM zonas WHERE id = ?;`;
    //console.log(sql);
    const dados = await queryPromise2(id, sql);
    //console.log(dados);
    return [].concat(dados);
  }
  async inserirRegistro(objeto) {
    const sql = "INSERT INTO zonas SET ?";
    await insertPromise(sql, objeto);
  }
  async updateRegistro(objeto, id) {
    //console.log(objeto, id);
    const sql = "UPDATE zonas SET ? WHERE id = ?";
    await updatePromise(id, objeto, sql);
  }
  async deletarRegistro(id) {
    const sql = "DELETE FROM zonas WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new Zonas();
