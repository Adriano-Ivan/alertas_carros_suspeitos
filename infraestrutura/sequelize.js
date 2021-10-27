const Sequelize = require("sequelize");

const sequelize = new Sequelize("veiculos_suspeitos", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});
// const mysql = require("mysql2");

// const conexao = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "admin",
//   database: "veiculos_suspeitos",
// });

module.exports = sequelize;
