const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();
const conexao = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT_DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = conexao;
