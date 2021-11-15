const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const deletePromise = require("../helpers/deletePromise");
class MensagensRecebidas {
  async pegarDados(id) {
    const sql = "SELECT * FROM mensagens_recebidas WHERE id_usuario = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao) {
    const sql = `SELECT * FROM mensagens_recebidas WHERE mensagem_recebida
         LIKE ?`;
    const dados = await queryPromise2(descricao + "%", sql);
    return [].concat(dados);
  }
  async findMensagemById(id) {
    const sql = `SELECT * FROM mensagens_recebidas WHERE id = ?;`;
    console.log(sql);
    const dados = await queryPromise2(id, sql);
    console.log(dados);
    return [].concat(dados);
  }
  async deletarMensagem(id) {
    const sql = "DELETE FROM mensagens_recebidas WHERE id = ?";
    await deletePromise(id, sql);
  }
}
module.exports = new MensagensRecebidas();
