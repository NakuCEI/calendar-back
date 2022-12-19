const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validateInputs } = require('../middlewares/validateInputs');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

// REGISTER
router.post('/new', [
    check('name', 'Debes escribir el nombre.').not().isEmpty(), 
    check('email', 'Debes escribir un email correcto.').isEmail(), 
    check('password', 'La contraseña debe tener entre seis y diez caracteres.').isLength({ min: 6, max: 10 }), 
    validateInputs 
], createUser);

// LOGIN
router.post('/', [
    check('email', 'Debes escribir un email correcto.').isEmail(), 
    check('password', 'La contraseña debe tener entre seis y diez caracteres.').isLength({ min: 6, max: 10 }), 
    validateInputs 
], loginUser);

// RENEW JWT
router.get('/renew', validateJWT, renewToken);


module.exports = router;