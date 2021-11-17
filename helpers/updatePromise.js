const conexao = require("../infraestrutura/conexao");

module.exports = (id, updatedElement, sql) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, [updatedElement, id], (erro, resultados) => {
      if (erro) reject("HOUVE ERRO NO UPDATE");
      resolve(resultados);
    });
  });
};
