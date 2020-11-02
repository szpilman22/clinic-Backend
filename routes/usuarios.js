const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { verificarToken } = require('../middlewares/validar-jwt');

const { getUsuarios, addUsuario, updateUsuario, deleteUser } = require('../controllers/usuarios');

// Obtener usuarios
router.get('/', verificarToken, getUsuarios);

// Agregar usuario
router.post('/',
    [
        verificarToken,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    addUsuario
);

// Actualizar usuario
router.put('/:id',
[
    verificarToken,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
],
updateUsuario
);

// Borrar usuario
router.delete('/:id', verificarToken, deleteUser);










module.exports = router;