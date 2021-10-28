const ListaAfazeres = require("../models/lista_afazeres");
const replaceTemplate = require("../modules/replaceTemplate");
const fileSystem = require("fs");
const tempAfazeres = fileSystem.readFileSync(
  `${__dirname}/../templates/template-afazeres.html`,
  "utf-8"
);
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
module.exports = (app) => {
  app.get("/lista_afazeres", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    //ListaAfazeres.pegarDados();
    const retorno = replaceTemplate(
      tempOverview,
      tempAfazeres
      //ListaAfazeres.retornoTarefas
    );
    res.end(retorno);
  });
  app.post("/lista_afazeres", (req, res) => {
    const tarefa = req.body;

    ListaAfazeres.adiciona(tarefa);
    //ListaAfazeres.pegarDados();
    const retorno = replaceTemplate(
      tempOverview,
      tempAfazeres
      //ListaAfazeres.retornoTarefas
    );
    res.end(retorno);
    //res.send("Você está na rota de /lista_afazeres e está realizando um POST");
  });
};
