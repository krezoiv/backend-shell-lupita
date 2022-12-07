/**
 * 
 */


 const { Router } = require( 'express' );
 const { check } = require ( 'express-validator' );

 const { validateJWT } = require( '../../middleware/validate-jwt.middleware' );
 const { isSuperAdministratorRole, isAdministratorRole, isUserRole } = require( '../../middleware/validate-roles.middleware' ); 
 const {  createPurchaseOrder, getPurchaseOrder, updateTotalPurchaseOrder, getTotalPurchase, getInfoPurchaseOrder, getPurchaseOrderId, updateIdPurchase, lastPurchaseOrder, deletePurchaseOrder } = require( '../../controllers/purchases/purchaseOrder.controllers')
 const router = Router();
 
 router.post('/', [validateJWT], createPurchaseOrder );

 router.post('/PurchaseOrder', [validateJWT], getInfoPurchaseOrder);
 router.put('/:id', [validateJWT], updateTotalPurchaseOrder);
 router.post('/idPurchase',  [validateJWT], updateIdPurchase);
 router.post('/totalPurchase', [validateJWT], getTotalPurchase);
 router.post('/PurchaseOrderId',[validateJWT], getPurchaseOrderId)
 router.get('/lastPurchaseOrder', [validateJWT], lastPurchaseOrder)
 router.post('/deletePurchaseOrder', [validateJWT], deletePurchaseOrder)
 
 
 module.exports = router;