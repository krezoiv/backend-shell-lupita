/**
 * 
 */
const { Router } = require( 'express' );
const { createVehicle, getVehicule } = require('../../controllers/persons/vehicles.controllers');
const { validateJWT } = require('../../middleware/validate-jwt.middleware');

const router = Router();

router.post('/', [validateJWT], createVehicle);
router.get('/', [validateJWT], getVehicule);

module.exports = router;