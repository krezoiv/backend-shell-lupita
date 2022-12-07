/**
 * 
 */
 const { Router } = require( 'express' );
 const { createPaymentMethod, getPaymentMethod } = require('../../controllers/documents/paymentMethods.controllers');
 const { validateJWT } = require('../../middleware/validate-jwt.middleware');
 
 
 const router = Router();
 
 router.get('/', [validateJWT], getPaymentMethod);
 router.post('/', [validateJWT], createPaymentMethod);
 module.exports = router;