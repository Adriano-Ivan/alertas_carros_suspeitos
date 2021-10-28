const conexao = require("../infraestrutura/conexao");

class ListaAfazeres {
  adiciona(tarefa) {
    // sequelize.create({
    //   tarefa,
    // });
    const sql = "INSERT INTO tarefas_a_fazer SET ?";

    conexao.query(sql, tarefa, (erro, resultados) => {
      if (erro) {
        console.log("HOUVE ERRO.");
      } else {
        //console.log(resultados);
      }
    });
  } /*
  pegarDados() {
    const sql = "SELECT * FROM tarefas_a_fazer;";

    this._retornoItensTarefas = conexao.query(sql, (erro, resultados) => {
      if (erro) {
        console.log(`${erro}:NÃO FOI POSSÍVEL EXIBIR.`);
      } else {
        //console.log(resultados);
        //console.log(typeof resultados);
        //console.log("Olá: ", resultados);
        //console.log("Ei, por que esse array fica vazio ?");
        return [...resultados];
        //console.log(this._retornoItensTarefas);
        //return this._retornoItensTarefas;
      }
    });

    //console.log(retorno);
    //return retorno;
  }*/
  get retornoTarefas() {
    return [].concat(this._retornoItensTarefas);
  }
}

module.exports = new ListaAfazeres();
