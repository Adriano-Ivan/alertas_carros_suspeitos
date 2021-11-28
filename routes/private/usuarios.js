const usuarioController = require("./../../controllers/usuarios");
module.exports = (app) => {
  app.get("/usuarios", usuarioController.getUsuarios);
  app.get("/adicionar_usuario", usuarioController.getAdicionarUsuario);
  app.post("/insert_usuario", usuarioController.postAdicionarUsuario);
  app.post("/delete_r_usuario", usuarioController.deletarRegistro);
  app.get("/update_r_usuario_page", usuarioController.getUpdateUsuario);
  app.post("/update_usuario", usuarioController.postUpdateUsuario);
};
