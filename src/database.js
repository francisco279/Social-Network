const mongoose     = require('mongoose');
const { URI }      = require('./keys');//bd configuration

//connect to mongoDB
const conecta = async() => {
    try 
    {
        const con = await mongoose.connect(URI); //connect to mongodb
        console.log("db is connected");
    } 
    catch (error) 
    {
        console.log(error);
    }
}

module.exports = conecta;