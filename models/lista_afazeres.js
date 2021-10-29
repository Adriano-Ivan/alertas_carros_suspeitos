const conexao = require("../infraestrutura/conexao");
const queryPromise = require("../modules/queryPromise");
const insertPromise = require("../modules/insertPromise");
class ListaAfazeres {
  async adiciona(tarefa) {
    // sequelize.create({
    //   tarefa,
    // });
    const sql = "INSERT INTO tarefas_a_fazer SET ?";

    await insertPromise(sql, tarefa);
  }

  async pegarDados() {
    const sql = "SELECT * FROM tarefas_a_fazer;";

    const dados = await queryPromise(sql);
    // const dados = await conexao.query(sql, (erro, resultados) => {
    //   if (erro) {
    //     console.log(`ERRO: ${erro}`);
    //   }
    //   if (resultados.length > 0) {
    //     console.log(resultados);
    //     return resultados;
    //   }
    // });
    // this._retornoItensTarefas = [...dados];
    // console.log(this._retornoItensTarefas);
    return [].concat(dados);
  }
  // get retornoTarefas() {
  //   return [].concat(this._retornoItensTarefas);
  // }
}

module.exports = new ListaAfazeres();
