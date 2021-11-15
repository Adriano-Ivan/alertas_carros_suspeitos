const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");

class Locais {
  async pegarDados(id) {
    const sql = "SELECT * FROM locais_alvo;";
    const dados = await queryPromise(sql);
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
}

module.exports = new Locais();
