const queryPromise = require("../modules/queryPromise");
const insertPromise = require("../modules/insertPromise");
const queryPorIdPromise = require("../modules/queryPorIdPromise");
const updatePromise = require("../modules/updatePromise");
const deletePromise = require("../modules/deletePromise");

class listaObservacoes {
  async adiciona(observacao) {
    const sql = "INSERT INTO observacoes_pertinentes SET ?";
    await insertPromise(sql, observacao);
  }

  async pegarDados() {
    const sql = "SELECT * FROM observacoes_pertinentes;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async buscarPorId(id) {
    const sql = `SELECT * FROM observacoes_pertinentes WHERE id = ${id}`;
    const dados = await queryPorIdPromise(sql);
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

module.exports = new listaObservacoes();
