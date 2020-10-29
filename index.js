require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./database/config');

// Crea el servidor de Express
const app = express();

// Base de Datos
dbConnect();

// Middlewares
app.use(cors());



// Rutas
app.get('/', (req, res) => {
    
    res.json(
        {
            ok: true,
            msg: 'Hola mundo desde el server'
        }
    );

});

// Escuchando puerto
app.listen( process.env.PORT, () => {
    console.log('Server on port' + 3000);
});