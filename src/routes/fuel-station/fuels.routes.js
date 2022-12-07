
/**
 * /api/fuels
 */
const { Router } = require( 'express');
const { check } = require( 'express-validator' );
const { getFuels, createFuel, updateFuel, deleteFuel, updatePrice, getFuelsActive, getFuelsIdp } = require('../../controllers/fuel-station/fuels.controllers');
const { validateJWT } = require( '../../middleware/validate-jwt.middleware');
const { isADMIN_ROLE, isUSER_ROLE, isGUEST_ROLE, isSUPER_ROLE } = require( '../../middleware/validate-roles.middleware' ); 


const router = Router();

router.get('/', [validateJWT], getFuels)
router.get('/active', [validateJWT], getFuelsActive);
router.post('/idp', [validateJWT], getFuelsIdp)
router.post( '/',  [validateJWT, isUSER_ROLE, isGUEST_ROLE], createFuel );
router.put('/:id', [validateJWT, isUSER_ROLE, isGUEST_ROLE], updateFuel);
router.put('/updatePrices/:id', [validateJWT, isUSER_ROLE, isGUEST_ROLE], updatePrice);
router.put('/delete/:id',  [validateJWT, isUSER_ROLE, isGUEST_ROLE, isADMIN_ROLE], deleteFuel);


module.exports = router;