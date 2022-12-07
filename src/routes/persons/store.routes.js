/**
 * 
 */
const { Router } = require( 'express' );
const { createStore, getStores } = require('../../controllers/persons/store.controllers');
const { validateJWT } = require('../../middleware/validate-jwt.middleware');

const router = Router();


router.get('/', [validateJWT], getStores)
router.post('/', [validateJWT], createStore);

module.exports = router;