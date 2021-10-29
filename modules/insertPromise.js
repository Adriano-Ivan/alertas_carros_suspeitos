const conexao = require("../infraestrutura/conexao");

module.exports = (sql, tarefa) => {
  conexao.query(sql, tarefa, (erro, resultados) => {
    if (erro) {
      console.log("HOUVE ERRO.");
    } else {
      //console.log(resultados);
    }
  });
};
