/**
 * 
 */

const {Router} = require('express');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');
const { getDispenserFuel, createDispenserFuel } = require('../../controllers/fuel-station/dispenserFuel.controllers');

const router = Router();

router.get('/', [validateJWT], getDispenserFuel);
router.post('/', [validateJWT], createDispenserFuel);

module.exports = router;