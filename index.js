// Variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./database/config');
const { urlencoded } = require('express');


// Crea el servidor de Express
const app = express();


// MIDDLEWARES
//Configuracion del CORS
app.use(cors());
// Lectura y Parseo del BODY
app.use( express.json() );


// Base de Datos
dbConnect();



// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/login'));



// Escuchando puerto
app.listen( process.env.PORT, () => {
    console.log('Server on port' + 3000);
});