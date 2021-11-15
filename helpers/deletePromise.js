const conexao = require("../infraestrutura/conexao");

module.exports = (id, sql) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, id, (erro, resultados) => {
      if (erro) reject("ERRO NO DELETE");
      resolve(resultados);
    });
  });
};
