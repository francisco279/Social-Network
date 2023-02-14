//server config
const express      = require("express")
const path         = require('path');
const { engine }   = require('express-handlebars');
const morgan       = require('morgan');
const multer       = require('multer');
const routes       = require('./routes/index');
const errorHandler = require("errorhandler");
const Handlebars   = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//express server
const app = express();

//settings 
app.set('port',  process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //views folder

//handlebars configuration
app.engine(
      ".hbs",
        engine({
        layoutsDir    : path.join(app.get("views"), "layouts"), //common views
        partialsDir   : path.join(app.get("views"), "partials"), //common views
        defaultLayout : "main",
        extname       : ".hbs",
        helpers       : require('./hbshelpers'),
        handlebars    : allowInsecurePrototypeAccess(Handlebars),
    })
);

app.set("view engine", ".hbs");

//middlewares
app.use(morgan("dev")); // to show console messages 
app.use(express.urlencoded({extended: false})) //to receive forms data

//Middlewares

app.use(multer({dest: path.join(__dirname, './public/upload/temp')}).single('image'));
app.use(express.urlencoded({extended: false})); //to receive data from forms
app.use(express.json()); 
//routes
app.use(routes);
// The Public directory for static files
app.use("/public", express.static(path.join(__dirname, "./public")));
//errohandler
// Error Handling
if ("development" === app.get("env")) 
{
    app.use(errorHandler());
}
module.exports = app;