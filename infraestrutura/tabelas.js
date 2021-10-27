class Tabelas {
  init(sequelize) {
    this.sequelize = sequelize;

    this.criarTarefasAfazer();
  }
  criarTarefasAfazer() {
    const tarefas_a_fazer = this.sequelize.define("tarefas_a_fazer", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    tarefas_a_fazer.sync({ force: true });
    // const sql =
    //   "CREATE TABLE IF NOT EXISTS tarefas_a_fazer (id int NOT NULL AUTO_INCREMENT,descricao text NOT NULL, PRIMARY KEY(id))";
    // this.conexao.query(sql, (erro) => {
    //   if (erro) {
    //     console.log(erro);
    //   } else {
    //     console.log("Tabela tarefas_a_fazer criada com sucesso");
    //   }
    // });
  }
}

module.exports = new Tabelas();
