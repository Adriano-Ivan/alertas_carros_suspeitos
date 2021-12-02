const conexao = require("../infraestrutura/conexao").conexao;

module.exports = (sql, elemento) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, elemento, (erro, resultados) => {
      if (erro) {
        reject("HOUVE ERRO NO INSERT !");
      } else {
        resolve(resultados);
      }
    });
  });
};
// module.exports = (sql, tarefa) => {
//   conexao.query(sql, tarefa, (erro, resultados) => {
//     if (erro) {
//       console.log("HOUVE ERRO NO INSERT !");
//     } else {
//       //console.log(resultados);
//     }
//   });
// };
