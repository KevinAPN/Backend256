const mongoose = require('mongoose');
require('dotenv').config();

//conexion con mongo
const conectarBD = () =>{
    mongoose
    .connect(process.env.DB_MONGO)
    .then(()=> console.log("estamos conectados con mongoDB"))
    .catch((err)=> console.log(err));
}

module.exports = conectarBD;