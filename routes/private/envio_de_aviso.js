const controllerEnvioDeAvisos = require("./../../controllers/envio_de_aviso");
module.exports = (app) => {
  app.get("/envio_de_aviso", controllerEnvioDeAvisos.getEnvioDeAvisos);
  app.post("/envio_de_aviso", controllerEnvioDeAvisos.enviarEmail);
  app.post(
    "/excluir_mensagem_enviada",
    controllerEnvioDeAvisos.excluirMensagemEnviada
  );
  app.get(
    "/envio_de_aviso/:descricao",
    controllerEnvioDeAvisos.getMensagensPorDescricao
  );
};
