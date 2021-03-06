const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
const updatePromise = require("../helpers/updatePromise");
const deletePromise = require("../helpers/deletePromise");

class ListaAfazeres {
  async adiciona(tarefa) {
    const sql = "INSERT INTO tarefas_a_fazer SET ?";
    await insertPromise(sql, tarefa);
  }

  async pegarDados() {
    const sql = "SELECT * FROM tarefas_a_fazer;";
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }
  async buscarPorDescricao(descricao) {
    const sql = `SELECT * FROM tarefas_a_fazer WHERE descricao LIKE ?`;
    const dados = await queryPromise2(descricao + "%", sql);
    //console.log(descricao);
    return [].concat(dados);
  }
  async alterarTarefa(id, updated_task) {
    const sql = `UPDATE tarefas_a_fazer SET descricao = ?WHERE id = ?`;
    await updatePromise(id, updated_task, sql);
  }
  async deletarTarefa(id) {
    const sql = "DELETE FROM tarefas_a_fazer WHERE id = ?";
    await deletePromise(id, sql);
  }
}

module.exports = new ListaAfazeres();
