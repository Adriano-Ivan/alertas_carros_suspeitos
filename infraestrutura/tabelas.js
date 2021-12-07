class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarTarefasAfazer();
    this.criarUsuarios();
    this.criarLocais();
    this.criarBotTelegram();
    this.criarZonas();
    this.criarMensagensRecebidas();
    this.criarMensagensEnviadas();
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
  criarMensagensEnviadas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS mensagens_enviadas(id int NOT NULL AUTO_INCREMENT, id_usuario int NOT NULL, mensagem_enviada text NOT NULL, PRIMARY KEY(id), FOREIGN KEY(id_usuario) REFERENCES usuarios(id))";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela mensagens_enviadas criada com sucesso.");
      }
    });
  }
  criarZonas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS zonas(id int NOT NULL AUTO_INCREMENT, zona VARCHAR(25) not null, PRIMARY KEY(id));";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela zonas criada com sucesso.");
      }
    });
  }
  criarBotTelegram() {
    const sql =
      "CREATE table if not exists bots_telegram (id int NOT NULL auto_increment,nome text NOT NULL,token_telegram TEXT NOT NULL,id_zona int not null default 1,PRIMARY KEY(id),foreign key(id_zona) references zonas(id));";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela bots_telegram criada com sucesso.");
      }
    });
  }
  criarMensagensRecebidas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS mensagens_recebidas(id int NOT NULL AUTO_INCREMENT, id_usuario int NOT NULL, mensagem_recebida text NOT NULL, PRIMARY KEY(id), FOREIGN KEY(id_usuario) REFERENCES usuarios(id))";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela mensagens_recebidas criada com sucesso");
      }
    });
  }
  criarLocais() {
    const sql =
      "CREATE TABLE IF NOT EXISTS locais_alvo(id int NOT NULL AUTO_INCREMENT, local VARCHAR(120) NOT NULL, PRIMARY KEY(id));";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela locais criada com sucesso");
      }
    });
  }
  criarUsuarios() {
    const sql =
      "CREATE TABLE IF NOT EXISTS usuarios(id int NOT NULL AUTO_INCREMENT, nome varchar(130) NOT NULL,email varchar(130) NOT NULL, id_zona int NOT NULL DEFAULT 1,insercoes int NOT NULL DEFAULT 0,autoridade VARCHAR(25) NOT NULL DEFAULT 'ADM',senha varchar(256) NOT NULL, PRIMARY KEY(id),CONSTRAINT zona_id FOREIGN KEY(id_zona) REFERENCES zonas(id))";
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela usuarios criada com sucesso.");
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
        console.log("Tabela veiculos_urgencia criada com sucesso.");
      }
    });
  }
  criarVeiculosSuspeitos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS veiculos_suspeitos(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido',id_zona int NOT NULL DEFAULT 1, placa varchar(7) NOT NULL,id_usuario INT NOT NULL DEFAULT 0, statusID int NOT NULL,id_ultimo_editor INT NOT NULL DEFAULT 0, nivel_urgenciaID int NOT NULL,momento_alerta datetime not null,alertado boolean not null default false, PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id), FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id),FOREIGN KEY(id_zona) REFERENCES zonas(id),local_alerta varchar(50) NOT NULL)";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela veiculos_suspeitos criada com sucesso.");
      }
    });
  }
  criarVeiculosRoubados() {
    const sql =
      "CREATE TABLE IF NOT EXISTS veiculos_roubados(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido', placa varchar(7) NOT NULL,id_usuario INT NOT NULL DEFAULT 0,id_zona int NOT NULL DEFAULT 1, statusID int NOT NULL,id_ultimo_editor INT NOT NULL DEFAULT 0, nivel_urgenciaID int NOT NULL, momento_alerta datetime not null,alertado boolean not null default false,PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id), FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id), local_roubo varchar(50) NOT NULL DEFAULT 'Indefinido',FOREIGN KEY(id_zona) REFERENCES zonas(id),local_alerta varchar(50) NOT NULL)";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela veiculos_roubados criada com sucesso.");
      }
    });
  }
  criarVeiculosInfracao() {
    const sql =
      " CREATE TABLE IF NOT EXISTS veiculos_infracao(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido',   placa varchar(7) NOT NULL,id_usuario INT NOT NULL DEFAULT 0, id_zona int NOT NULL DEFAULT 1,statusID int NOT NULL,id_ultimo_editor INT NOT NULL DEFAULT 0, nivel_urgenciaID int NOT NULL, momento_alerta datetime not null DEFAULT now(),alertado boolean not null default false, PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id),   FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id),  local_alerta varchar(50) NOT NULL, FOREIGN KEY(id_zona) REFERENCES zonas(id),  gravidade_infracao ENUM('leve','média','grave','gravíssima'));";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela veiculos_infracao criada com sucesso.");
      }
    });
  }

  criarVeiculosIrregulares() {
    const sql =
      " CREATE TABLE IF NOT EXISTS veiculos_irregulares(id int NOT NULL AUTO_INCREMENT, dono varchar(70) NOT NULL DEFAULT 'Desconhecido',  id_usuario INT NOT NULL DEFAULT 0,id_zona int NOT NULL DEFAULT 1, placa varchar(7) NOT NULL, statusID int NOT NULL, id_ultimo_editor INT NOT NULL DEFAULT 0,nivel_urgenciaID int NOT NULL, momento_alerta datetime not null,alertado boolean not null default false, PRIMARY KEY(id), FOREIGN KEY(statusID) REFERENCES status(id),   FOREIGN KEY(nivel_urgenciaID) REFERENCES nivel_urgencia(id),  local_alerta varchar(50) NOT NULL, FOREIGN KEY(id_zona) REFERENCES zonas(id),medida_administrativa ENUM('remoção','retenção'));";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela veiculos_irregulares criada com sucesso.");
      }
    });
  }
}

module.exports = new Tabelas();
