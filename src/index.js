const app = require("./app");
const conecta = require("./database");
//database
conecta();
//starting the server
app.listen(app.get('port'));
console.log("server on port", app.get('port'));