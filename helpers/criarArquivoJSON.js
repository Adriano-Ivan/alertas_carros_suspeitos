module.exports = (nomes, ids, statusS, urgenciaNivel, placas) => {
  const objetos = [];
  const fileSystem = require("fs");
  if (!fileSystem.existsSync(`${__dirname}/../JSON/data.json`)) {
    for (let i = 0; i < nomes.length; i++) {
      const objeto = {
        id: ids[i].replace("\r", ""),
        nome: nomes[i].replace("\r", ""),
        status: statusS[Math.trunc(Math.random() * 3)].replace("\r", ""),
        urgencia: urgenciaNivel[Math.trunc(Math.random() * 3)].replace(
          "\r",
          ""
        ),
        placa: placas[i].replace("\r", ""),
      };
      objetos.push(objeto);
    }
    const json = JSON.stringify(objetos);
    fileSystem.writeFileSync(`${__dirname}/../JSON/data.json`, json);
    //console.log("ACABOU");
  }
};
