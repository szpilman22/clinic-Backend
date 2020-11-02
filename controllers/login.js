const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarToken } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        
        if (!usuarioDB) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe usuario con ese Email'
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido'
            });
        }

        // Generar JWT
        const token = await generarToken(usuarioDB.id);

        res.status(200).json({
            ok: true,
            msg: 'Autenticado',
            token
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};





module.exports = {
    login
};