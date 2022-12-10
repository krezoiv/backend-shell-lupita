/**
 * 
 */


 const { Router } = require( 'express');
const { getLubricants, createLubricants, updateLubricants } = require('../../controllers/lubricants/lubricant.controllers');
const { validateJWT } = require ( '../../middleware/validate-jwt.middleware');
const { isADMIN_ROLE, isUSER_ROLE, isGUEST_ROLE, isSUPER_ROLE } = require( '../../middleware/validate-roles.middleware' ); 



const router = Router();

router.get('/',  [validateJWT], getLubricants);
router.post('/', [validateJWT, isGUEST_ROLE], createLubricants)
router.put('/:id', [validateJWT, isGUEST_ROLE], updateLubricants)


module.exports = router;