/**
 * 
 */
const { Router } = require( 'express' );
const { getFuelTanks, createFuelTank, updateFuelTank, deleteTankFuel, getFuelTankId } = require('../../controllers/fuel-station/fuelTanks.controllers');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');
const { isSUPER_ROLE, isADMIN_ROLE, isUSER_ROLE, isGUEST_ROLE } = require('../../middleware/validate-roles.middleware');
const issuedModels = require('../../models/status/issued.models');


const router = Router();

router.get('/', [validateJWT], getFuelTanks);
router.post('/fuelTankId', [validateJWT], getFuelTankId)
router.post('/',  [validateJWT, isUSER_ROLE, isGUEST_ROLE], createFuelTank);
router.put('/:id',  [validateJWT, isSUPER_ROLE, isADMIN_ROLE], updateFuelTank);
router.put('/delete/:id',  [validateJWT, isSUPER_ROLE, isADMIN_ROLE], deleteTankFuel)


module.exports = router;