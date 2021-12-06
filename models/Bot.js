const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");
class Bot {
  async pegarDados(id) {
    const sql = "SELECT * FROM bots_telegram;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarPrimeiroRegistro() {
    const sql = "SELECT * FROM bots_telegram limit 0,1;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async pegarDadosPorId(id) {
    const sql = "SELECT * FROM bots_telegram WHERE id = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao) {
    const sql = `SELECT * FROM bots_telegram WHERE local
             LIKE ?`;
    const dados = await queryPromise2(descricao + "%", sql);
    return [].concat(dados);
  }
  async findMensagemById(id) {
    const sql = `SELECT * FROM bots_telegram WHERE id = ?;`;
    console.log(sql);
    const dados = await queryPromise2(id, sql);
    console.log(dados);
    return [].concat(dados);
  }
  async inserirRegistro(objeto) {
    const sql = "INSERT INTO bots_telegram SET ?";
    await insertPromise(sql, objeto);
  }
  async updateRegistro(objeto, id) {
    console.log(objeto, id);
    const sql = "UPDATE bots_telegram SET ? WHERE id = ?";
    await updatePromise(id, objeto, sql);
  }
  async deletarRegistro(id) {
    const sql = "DELETE FROM bots_telegram WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new Bot();
