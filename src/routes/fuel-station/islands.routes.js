/**
 * /api/islands
 */
const  { Router } = require( 'express' );
const { getIsland, createIsland, updateIsland, deleteIsland, getIslandActive } = require('../../controllers/fuel-station/islands.controllers');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');
const { isSUPER_ROLE, isADMIN_ROLE, isUSER_ROLE, isGUEST_ROLE } = require('../../middleware/validate-roles.middleware');

const router = Router();

router.get('/',[validateJWT], getIsland);
router.get('/active', [validateJWT], getIslandActive)
router.post('/',  [validateJWT, isUSER_ROLE, isGUEST_ROLE, isADMIN_ROLE], createIsland);
router.put('/:id',  [validateJWT,  isUSER_ROLE, isGUEST_ROLE, isADMIN_ROLE], updateIsland);
router.put('/delete/:id',  [validateJWT, isUSER_ROLE, isGUEST_ROLE, isADMIN_ROLE], deleteIsland);


module.exports = router;