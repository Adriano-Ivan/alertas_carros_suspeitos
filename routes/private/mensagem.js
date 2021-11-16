const emailController = require("./../../controllers/emailController");

module.exports = (app) => {
  app.post("/mensagem", emailController.enviarEmail);
};
