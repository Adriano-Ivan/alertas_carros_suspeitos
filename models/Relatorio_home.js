const queryPromise2 = require("../helpers/queryPromise2");

class RelatorioHome {
  async executarQueryDoRelatorio(id_zona) {
    const sql_roubados =
      "SELECT s.status AS status_roubados, count(s.id) AS vezes_roubados FROM veiculos_roubados INNER JOIN status AS s ON veiculos_roubados.statusID = s.id WHERE id_zona = ? GROUP BY s.status;";
    const sql_irregulares =
      "SELECT s.status AS status_irregulares, count(s.id) AS vezes_irregulares FROM veiculos_irregulares INNER JOIN status AS s ON veiculos_irregulares.statusID = s.id WHERE id_zona = ? GROUP BY s.status;";
    const sql_infracao =
      "SELECT s.status AS status_infracao, count(s.id) AS vezes_infracao FROM veiculos_infracao INNER JOIN status AS s ON veiculos_infracao.statusID = s.id WHERE id_zona = ? GROUP BY s.status;";
    const sql_suspeitos =
      "SELECT s.status AS status_suspeitos, count(s.id) AS vezes_suspeitos FROM veiculos_suspeitos INNER JOIN status AS s ON veiculos_suspeitos.statusID = s.id WHERE id_zona = ? GROUP BY s.status;";

    //console.log(sql_suspeitos);
    const dados_roubados = await queryPromise2(id_zona, sql_roubados);
    const dados_irregulares = await queryPromise2(id_zona, sql_irregulares);
    const dados_infracao = await queryPromise2(id_zona, sql_infracao);
    const dados_suspeitos = await queryPromise2(id_zona, sql_suspeitos);

    return [].concat(
      [dados_roubados],
      [dados_irregulares],
      [dados_infracao],
      [dados_suspeitos]
    );
  }
}

module.exports = new RelatorioHome();
