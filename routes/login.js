const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/login');

router.post('/',
    [
        check('email', 'El emil es obligatorio').isEmail(),
        check('password', 'El pssword es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);











module.exports = router;