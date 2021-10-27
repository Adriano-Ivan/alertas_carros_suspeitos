const retornarOverview = require("../modules/retornarOverview");
const fileSystem = require("fs");
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/../templates/template-overview.html`,
  "utf-8"
);
module.exports = (app) => {
  app.get("/", (req, res) => {
    retornarOverview(req, res, tempOverview);
    //console.log(dataObject);
  });
};
