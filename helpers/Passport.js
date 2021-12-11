const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
//let userInformation = "A";

// exports.pegarUsuario = () => {
//   return userInformation;
// };
exports.processarAutenticacao = (passport, usuario) => {
  passport.serializeUser((user, done) => {
    done(null, user[0].id);
  });

  passport.deserializeUser((id, done) => {
    try {
      const user = usuario.findUserById(id);
      done(null, user);
    } catch (error) {
      console.log(error);
      return done(error, null);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email_nome",
        passwordField: "password",
      },
      (username, password, done) => {
        try {
          usuario
            .findUser(username)
            .then((resultado) => {
              if (!resultado || resultado.length === 0) {
                return done(null, false);
              }
              // console.log(resultado, "+++");
              // console.log(password, username);
              // const salt = bcrypt.genSaltSync(10);

              const isValid = bcrypt.compareSync(password, resultado[0].senha);
              // console.log(isValid);
              if (!isValid) {
                return done(null, false);
              } else {
                // userInformation = resultado;
                return done(null, resultado);
              }
            })
            .catch((erro) => {
              console.log(erro);
            });
        } catch (err) {
          console.log(err);
          return done(err, false);
        }
      }
    )
  );
};
