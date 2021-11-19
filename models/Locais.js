const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");
class Locais {
  async pegarDados(id) {
    const sql = "SELECT * FROM locais_alvo;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarDadosPorId(id) {
    const sql = "SELECT * FROM locais_alvo WHERE id = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao) {
    const sql = `SELECT * FROM locais_alvo WHERE local
             LIKE ?`;
    const dados = await queryPromise2(descricao + "%", sql);
    return [].concat(dados);
  }
  async findMensagemById(id) {
    const sql = `SELECT * FROM locais_alvo WHERE id = ?;`;
    console.log(sql);
    const dados = await queryPromise2(id, sql);
    console.log(dados);
    return [].concat(dados);
  }
  async inserirRegistro(objeto) {
    const sql = "INSERT INTO locais_alvo SET ?";
    await insertPromise(sql, objeto);
  }
  async updateRegistro(objeto, id) {
    console.log(objeto, id);
    const sql = "UPDATE locais_alvo SET ? WHERE id = ?";
    await updatePromise(id, objeto, sql);
  }
  async deletarRegistro(id) {
    const sql = "DELETE FROM locais_alvo WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new Locais();
