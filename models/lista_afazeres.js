const queryPromise = require("../modules/queryPromise");
const insertPromise = require("../modules/insertPromise");
const queryPorIdPromise = require("../modules/queryPorIdPromise");
const updatePromise = require("../modules/updatePromise");
const deletePromise = require("../modules/deletePromise");

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
  async buscarPorId(id, res) {
    const sql = `SELECT * FROM tarefas_a_fazer WHERE id = ${id}`;
    const dados = await queryPorIdPromise(sql);
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
