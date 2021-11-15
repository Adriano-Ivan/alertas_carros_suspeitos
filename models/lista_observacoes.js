const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const queryPorIdPromise = require("../helpers/queryPorIdPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");

class ListaObservacoes {
  async adiciona(observacao) {
    const sql = "INSERT INTO observacoes_pertinentes SET ?";
    await insertPromise(sql, observacao);
  }

  async pegarDados() {
    const sql = "SELECT * FROM observacoes_pertinentes;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao) {
    const sql = `SELECT * FROM observacoes_pertinentes WHERE descricao_observacao
     LIKE ?`;
    const dados = await queryPromise2(descricao + "%", sql);
    return [].concat(dados);
  }
  async alterarObservacao(id, updated_observation) {
    const sql = `UPDATE observacoes_pertinentes SET descricao_observacao = ? WHERE id = ?`;
    await updatePromise(id, updated_observation, sql);
  }
  async deletarObservacao(id) {
    const sql = "DELETE FROM observacoes_pertinentes WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new ListaObservacoes();
