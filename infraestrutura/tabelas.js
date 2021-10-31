class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarTarefasAfazer();
    this.criarObservacoesPertinentes();
  }
  criarTarefasAfazer() {
    const sql =
      "CREATE TABLE IF NOT EXISTS tarefas_a_fazer (id int NOT NULL AUTO_INCREMENT,descricao text NOT NULL, PRIMARY KEY(id))";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela tarefas_a_fazer criada com sucesso");
      }
    });
  }
  criarObservacoesPertinentes() {
    const sql =
      "CREATE TABLE IF NOT EXISTS observacoes_pertinentes (id int NOT NULL AUTO_INCREMENT,descricao text NOT NULL, PRIMARY KEY(id))";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela observacoes_pertinentes criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
