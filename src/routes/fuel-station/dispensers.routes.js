/**
 * 
 */
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { createDispenser, getDispenser, getDispensersActive, updateDispenser, deleteDispenser, gerDisenserA, gerDisenserB } = require('../../controllers/fuel-station/dispensers.controllers');
const { validateJWT } = require( '../../middleware/validate-jwt.middleware' );
const { isSuperAdministratorRole, isAdministratorRole, isUserRole, isSUPER_ROLE, isADMIN_ROLE } = require( '../../middleware/validate-roles.middleware' );

const router = Router();

router.get('/', [validateJWT], getDispenser)
router.get('/active', [validateJWT], getDispensersActive);
router.post ( '/', [validateJWT], createDispenser);
router.put('/:id', [validateJWT], updateDispenser);
router.put('/delete/:id',  [validateJWT, isSUPER_ROLE, isADMIN_ROLE], deleteDispenser);
router.get('/dispenserA', [validateJWT], gerDisenserA);
router.get('/dispenserB', [validateJWT], gerDisenserB);


module.exports = router;
