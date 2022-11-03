const mongoose = require('mongoose');

const dbConnection = async() => {
   
  await mongoose.connect(process.env.DB_URL)
        .then(() => console.log('Conexión exitosa a mongoDB'))
        .catch(() => console.log('Error al conectarse a la Base de datos'));
}

module.exports = dbConnection;