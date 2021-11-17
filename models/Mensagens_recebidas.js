const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const deletePromise = require("../helpers/deletePromise");
class MensagensRecebidas {
  async pegarDados(id) {
    const sql = "SELECT * FROM mensagens_recebidas WHERE id_usuario = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao, id_usuario) {
    const sql = `SELECT * FROM mensagens_recebidas WHERE mensagem_recebida
         LIKE ? and id_usuario = ?`;
    const dados = await queryPromise2([descricao + "%", id_usuario], sql);
    return [].concat(dados);
  }
  async findMensagemById(id, id_usuario) {
    const sql = `SELECT * FROM mensagens_recebidas WHERE id = ? and id_usuario = ?;`;
    console.log(sql);
    const dados = await queryPromise2([id, id_usuario], sql);
    console.log(dados);
    return [].concat(dados);
  }
  async deletarMensagem(id, id_usuario) {
    const sql = "DELETE FROM mensagens_recebidas WHERE id = ? and id_usuario=?";
    await deletePromise([id, id_usuario], sql);
  }
}
module.exports = new MensagensRecebidas();
