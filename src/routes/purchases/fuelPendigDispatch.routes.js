/**
 * * fuel pending dispatch
 */

const {Router} = require('express');
const { createFuelPendingDispatch } = require('../../controllers/purchases/fuelPendingDispatch.controllers');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');

const router = Router();

router.post('/', [validateJWT], createFuelPendingDispatch)


module.exports = router;