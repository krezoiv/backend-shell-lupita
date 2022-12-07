/**
 * 
 */
 const { Router } = require( 'express');

const { createSideDispenser, getSideDispenser, getSideA, getSideB } = require('../../controllers/fuel-station/sideDispenser.controllers');
 const { validateJWT } = require( '../../middleware/validate-jwt.middleware');
 const {isADMIN_ROLE, isSUPER_ROLE} = require('../../middleware/validate-roles.middleware')

 const router = Router();

 getSideA
 router.get('/', [validateJWT], getSideDispenser);
 router.get('/sideA', [validateJWT], getSideA);
 router.get('/sideB', [validateJWT], getSideB);
 router.post('/',  [validateJWT, isSUPER_ROLE, isADMIN_ROLE], createSideDispenser);

 module.exports = router;
