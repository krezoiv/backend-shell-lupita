/**
 * 
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken, loggedUser } = require('../../controllers/users/auth.controllers');

const { validateJWT } = require('../../middleware/validate-jwt.middleware');

const router = Router();

router.post('/',
  [
    check('email', 'Correo electrónico es obligatorio').isEmail(),
    check('password', 'Contraseña es obligatoria').not().isEmpty(),
   
  ],
  login
);

router.post('/loggedUser', loggedUser)

router.get('/renew', [validateJWT], renewToken)

module.exports = router;