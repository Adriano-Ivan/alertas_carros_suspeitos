const usuarioController = require("./../../controllers/usuarios");
module.exports = (app) => {
  app.get("/usuarios", usuarioController.getUsuarios);
  app.get("/adicionar_usuario", usuarioController.getAdicionarUsuario);
  app.post("/insert_usuario", usuarioController.postAdicionarUsuario);
};
