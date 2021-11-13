const queryPromise2 = require("../modules/queryPromise2");
// const AES = require("mysql-aes-binary");
// const decrypt = function (text) {
//   return AES.decrypt(text, "chave_node");
// };

class Usuario {
  async buscarPorEmailOuNomeESenha(senha, emailOuNome) {
    const sql = `SELECT nome, email, CAST(AES_DECRYPT(senha,'chave_node') AS CHAR(256)) AS senha_de FROM usuarios WHERE email = ? or nome = ? and CAST(AES_DECRYPT(senha,'chave_node') AS CHAR(256)) = ?;`;
    console.log(sql);
    const dados = await queryPromise2([emailOuNome, emailOuNome, senha], sql);
    console.log(dados);
    return [].concat(dados);
  }
  async findUser(emailOuNome) {
    // const sql = `SELECT id,nome,email,CAST(AES_DECRYPT(senha,'chave_node') AS CHAR(256)) AS senha FROM usuarios WHERE email = ? or nome = ?;`;
    const sql = `SELECT *
FROM  usuarios WHERE email = ? or nome = ?;`;
    console.log(sql);
    const dados = await queryPromise2([emailOuNome, emailOuNome], sql);
    //console.log(dados);
    return [].concat(dados);
  }
  async findUserById(id) {
    const sql = `SELECT * FROM usuarios WHERE id = ?;`;
    console.log(sql);
    const dados = await queryPromise2(id, sql);
    console.log(dados);
    return [].concat(dados);
  }
}
module.exports = new Usuario();
