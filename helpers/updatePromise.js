const conexao = require("../infraestrutura/conexao");

module.exports = (id, updatedTask, sql) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, [updatedTask, id], (erro, resultados) => {
      if (erro) reject("HOUVE ERRO NO UPDATE");
      resolve(resultados);
    });
  });
};
