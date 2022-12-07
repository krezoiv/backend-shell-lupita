
// rutas de usuarios v1 finalizadd

/*
Rutas usaurios:
/api/users

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser, usuarioRol, updatePass, getUserByName } = require('../../controllers/users/users.controllers');

const { validateJWT } = require('../../middleware/validate-jwt.middleware');
const { isUSER_ROLE, isADMIN_ROLE, isSUPER_ROLE, isGUEST_ROLE } = require('../../middleware/validate-roles.middleware');

const router = Router();

router.get('/', getUsers);


router.get('/consulta', usuarioRol);

router.post('/', [validateJWT, isUSER_ROLE, isGUEST_ROLE],createUser );

router.post('/userUpdate', [validateJWT, isGUEST_ROLE, isUSER_ROLE],updateUser);

router.put('/userDelete',  [validateJWT, isGUEST_ROLE, isUSER_ROLE, isADMIN_ROLE], deleteUser);

router.post('/updatePass',  [validateJWT, isGUEST_ROLE],updatePass)

router.post('/getUserByName', [validateJWT], getUserByName)
module.exports = router;