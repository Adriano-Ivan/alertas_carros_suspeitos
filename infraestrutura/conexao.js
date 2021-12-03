const mysql = require("mysql2");
const MySQLEvents = require("mysql-events");
// const ora = require("ora"); // cool spinner
// const spinner = ora({
//   text: "🛸 Waiting for database events... 🛸",
//   color: "blue",
//   spinner: "dots2",
// });
const dotenv = require("dotenv");

// dotenv.config();
// exports.conexao = mysql.createConnection({
//   host: process.env.HOST,
//   port: process.env.PORT_DATABASE,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

dotenv.config();
exports.conexao = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT_DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const conn = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
};
console.log(conn);
//console.log("EI EI EI", conn);
const instance = new MySQLEvents(conn);
console.log("testeeeeeee");
exports.instancia = instance;
/*
  const watcher = instance.add(
    "veiculos_suspeitos.*",
    function (oldRow, newRow, event) {
      console.log("EITTAAAAAAAA");
      console.log(oldRow);
      //row inserted
      if (oldRow === null) {
        console.log("Row inserted");
      }

      //row deleted
      if (newRow === null) {
        console.log("Row deleted");
      }

      //row updated
      if (oldRow !== null && newRow !== null) {
        console.log("Row updated");
      }

      //detailed event information
      console.log(event);
    }
  );
  */
// console.log(watcher);

//program().catch(console.error);
//module.exports = conexao;
