const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const deletePromise = require("../helpers/deletePromise");
class MensagensEnviadas {
  async pegarDados(id) {
    const sql = "SELECT * FROM mensagens_enviadas WHERE id_usuario = ?;";
    const dados = await queryPromise2(id, sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao, id_usuario) {
    const sql = `SELECT * FROM mensagens_enviadas WHERE mensagem_enviada
         LIKE ? and id_usuario = ?`;
    const dados = await queryPromise2([descricao + "%", id_usuario], sql);
    return [].concat(dados);
  }
  async findMensagemById(id, id_usuario) {
    const sql = `SELECT * FROM mensagens_enviadas WHERE id = ? and id_usuario = ?;`;
    console.log(sql);
    const dados = await queryPromise2([id, id_usuario], sql);
    console.log(id, id_usuario);
    console.log(dados);
    return [].concat(dados);
  }
  async adiciona(mensagem, id_usuario) {
    const sql =
      "INSERT INTO mensagens_enviadas(mensagem_enviada, id_usuario) VALUES(?,?)";
    await insertPromise(sql, [mensagem, id_usuario]);
  }
  async deletarMensagem(id, id_usuario) {
    const sql =
      "DELETE FROM mensagens_enviadas WHERE id = ? and id_usuario = ?";
    await deletePromise([id, id_usuario], sql);
  }

}
module.exports = new MensagensEnviadas();
