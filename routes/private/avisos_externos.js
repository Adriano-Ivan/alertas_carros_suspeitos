const controllerAvisosExternos = require("./../../controllers/avisos_externos");
module.exports = (app) => {
  app.get("/avisos_externos", controllerAvisosExternos.getAvisosExternos);
  app.post("/excluir_mensagem", controllerAvisosExternos.deletarMensagem);
};
