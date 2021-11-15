const conexao = require("../infraestrutura/conexao");

module.exports = (sql) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, (erro, resultados) => {
      if (erro) reject("HOUVE ERRO NA QUERY !");
      resolve(resultados);
    });
  });
};
