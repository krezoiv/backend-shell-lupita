/**
 * ruta de mangueras
 */

const {Router} = require('express');
const { getHoses, getHosesActive, createHose, updateHose, deleteHose, getRegularPrice, getSuperPrice, getDieselPrice, getHoseIdByAssigmentHoseId, getFuelIdByHoseId } = require('../../controllers/fuel-station/hoses.controllers');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');
const { isSUPER_ROLE, isADMIN_ROLE, isUSER_ROLE, isGUEST_ROLE } = require('../../middleware/validate-roles.middleware');


const router = Router();

router.get('/', [validateJWT], getHoses),
router.get('/active', [validateJWT], getHosesActive),
router.get('/regularprice', getRegularPrice);
router.get('/superprice', getSuperPrice);
router.get('/dieselprice', getDieselPrice);
router.post('/',  [validateJWT,isUSER_ROLE, isGUEST_ROLE, isADMIN_ROLE], createHose);
router.post('/hoseId', [validateJWT], getHoseIdByAssigmentHoseId);
router.post('/fuelId', [validateJWT], getFuelIdByHoseId);
router.put('/:id', [validateJWT, isUSER_ROLE, isGUEST_ROLE, isADMIN_ROLE], updateHose);
router.put('/delete/:id',  [validateJWT, isUSER_ROLE, isGUEST_ROLE, isADMIN_ROLE], deleteHose);

module.exports = router;