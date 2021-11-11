const fileSystem = require("fs");
const tempLogin = fileSystem.readFileSync(
  `${__dirname}/../templates/login.html`,
  "utf-8"
);

exports.getLogin = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(tempLogin);
};
