const http = require("http");
const Server = require("socket.io");
const customExpress = require("./customExpress");

exports.serverHttp = () => http.createServer(customExpress());
exports.io = () => {
  return new Server.Server(http.createServer(customExpress));
};

// module.export = () => {
//   const serverHttp = http.createServer(customExpress());
//   const io = new Server(serverHttp);
// };
