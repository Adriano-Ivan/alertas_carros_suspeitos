const queryPromise2 = require("../modules/queryPromise2");
class Usuario {
  async buscarPorEmail(email) {
    const sql = `SELECT * FROM usuarios WHERE email
         = ?`;
    const dados = await queryPromise2(email, sql);
    return [].concat(dados);
  }
}
module.exports = new Usuario();
