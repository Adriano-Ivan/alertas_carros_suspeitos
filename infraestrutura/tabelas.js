class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarTarefasAfazer();
    this.criarObservacoesPertinentes();
    this.criarStatus();
    this.criarNivelUrgencia();
    this.criarVeiculosSuspeitos();
    this.criarVeiculosRoubados();
    this.criarVeiculosInfracao();
    this.criarVeiculosIrregulares();
  }
  criarTarefasAfazer() {
    const sql =
      "CREATE TABLE IF NOT EXISTS tarefas_a_fazer (id int NOT NULL AUTO_INCREMENT,descricao text NOT NULL, PRIMARY KEY(id))";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela tarefas_a_fazer criada com sucesso.");
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
        console.log("Tabela observacoes_pertinentes criada com sucesso.");
      }
    });
  }
  criarStatus() {
    const sql =
      "CREATE TABLE IF NOT EXISTS status (id int NOT NULL AUTO_INCREMENT, status varchar(25) NOT NULL, PRIMARY KEY(id))";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela status criada com sucesso.");
      }
    });
  }
  criarNivelUrgencia() {
    const sql =
      "CREATE TABLE IF NOT EXISTS nivel_urgencia (id int NOT NULL AUTO_INCREMENT, nivel_urgencia varchar(15) NOT NULL, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela nivel_urgencia criada com sucesso.");
      }
    });
  }
  criarVeiculosSuspeitos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS veiculos_suspeitos(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido', placa varchar(7) NOT NULL, statusID int NOT NULL, nivel_urgenciaID int NOT NULL, PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id), FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id),local_alerta varchar(50) NOT NULL)";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela carros_suspeitos criada com sucesso.");
      }
    });
  }
  criarVeiculosRoubados() {
    const sql =
      "CREATE TABLE IF NOT EXISTS veiculos_roubados(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido', placa varchar(7) NOT NULL, statusID int NOT NULL, nivel_urgenciaID int NOT NULL, PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id), FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id), local_roubo varchar(50) NOT NULL DEFAULT 'Indefinido',local_alerta varchar(50) NOT NULL)";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela carros_roubados criada com sucesso.");
      }
    });
  }
  criarVeiculosInfracao() {
    const sql =
      " CREATE TABLE IF NOT EXISTS veiculos_infracao(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido',   placa varchar(7) NOT NULL, statusID int NOT NULL, nivel_urgenciaID int NOT NULL,  PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id),   FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id),  local_alerta varchar(50) NOT NULL,   gravidade_infracao ENUM('leve','média','grave','gravíssima'));";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela carros_infracao criada com sucesso.");
      }
    });
  }
  criarVeiculosIrregulares() {
    const sql =
      " CREATE TABLE IF NOT EXISTS veiculos_irregulares(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido',   placa varchar(7) NOT NULL, statusID int NOT NULL, nivel_urgenciaID int NOT NULL,  PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id),   FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id),  local_alerta varchar(50) NOT NULL, medida_administrativa ENUM('remoção','retenção'));";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela carros_irregulares criada com sucesso.");
      }
    });
  }
}

module.exports = new Tabelas();
