const conexao = require("../infraestrutura/conexao");

module.exports = (sql, tarefa) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, tarefa, (erro, resultados) => {
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
