const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');


// Obtener Usuarios
const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');
    
    res.json(
        {
            ok: true,
            usuarios
        }
    );
};

// Agregar usuario
const addUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailDuplicado = await Usuario.findOne({ email });

        if (emailDuplicado) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Generar JWT
        const token = await generarToken(usuario.id);

        // Guardar usurio
        await usuario.save();

        res.json(
            {
                ok: true,
                msg: 'Add Usuario',
                usuario,
                token
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
    
    
};

// Actualizar usuario
const updateUsuario = async(req, res = response) => {

    // Validar token y comprobar que el usuario se correcto

    const uid = req.params.id;

    try {
        
        const usuarioDB = Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {        

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        const userActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });
        
        res.json({
            ok: true,
            msg: 'Update Usuario',
            userActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

// Borrar usuario
const deleteUser = async(req, res = response) => {
    
    const uid = req.params.id;

    try {
        
        const userDB = await Usuario.findById(uid);

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No esxiste un Usuario con ese ID'
            });
        }

        const userDelete = await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario borrado',
            userDelete
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};



module.exports = {
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUser
};