/**
 * 
 * Rutas para status de activo / inactivo
 *  /api/status/
 * 
 */  

const { Router } = require( 'express' );
const { createStatus, getStatus } = require( '../../controllers/status/status.controllers');
const router = Router();


router.post('/', createStatus);
router.get('/', getStatus);

module.exports = router;