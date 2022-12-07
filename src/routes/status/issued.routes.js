/**
 * rutas para emitidos
 * /api/issued/
 */

const { Router } = require('express');
const { createIssued } = require('../../controllers/status/issued.controller');
const { validateJWT } = require( '../../middleware/validate-jwt.middleware'); 

const router = Router();

router.post('/',[validateJWT], createIssued);


module.exports = router;