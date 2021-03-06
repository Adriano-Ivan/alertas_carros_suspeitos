const conexao = require("../infraestrutura/conexao").conexao;

module.exports = (sql) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, (erro, resultados) => {
      if (erro) reject(erro);
      resolve(resultados);
    });
  });
};
