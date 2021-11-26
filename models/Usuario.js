const queryPromise = require("../helpers/queryPromise");
const queryPromise2 = require("../helpers/queryPromise2");
const insertPromise = require("../helpers/insertPromise");
// const AES = require("mysql-aes-binary");
// const decrypt = function (text) {
//   return AES.decrypt(text, "chave_node");
// };

class Usuario {
  async getUsuarios() {
    const sql = `SELECT id,nome, email, autoridade FROM usuarios;`;
    const dados = await queryPromise(sql);
    return [].concat(dados);
  }

  async avaliarEmail(email) {
    const sql = `SELECT email FROM usuarios WHERE email = ?`;

    const dados = await queryPromise2(email, sql);

    return [].concat(dados);
  }

  async inserirRegistro(objeto) {
    const sql = "INSERT INTO usuarios SET ?";
    await insertPromise(sql, objeto);
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
    //console.log(sql);
    const dados = await queryPromise2(id, sql);
    //console.log(dados);
    return [].concat(dados);
  }
}
module.exports = new Usuario();
