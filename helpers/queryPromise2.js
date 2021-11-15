const conexao = require("../infraestrutura/conexao");

module.exports = (descricao, sql) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, descricao, (erro, resultados) => {
      if (erro) reject("HOUVE ERRO NA QUERY !");
      resolve(resultados);
    });
  });
};
