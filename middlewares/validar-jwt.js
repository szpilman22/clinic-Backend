
const { response } = require('express');
const jwt = require('jsonwebtoken');

const verificarToken = (req, res = response, next) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        
        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};


module.exports = {
    verificarToken
};