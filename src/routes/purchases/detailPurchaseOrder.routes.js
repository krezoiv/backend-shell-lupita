
/**
 * 
 */
const { Router } = require( 'express' );
const { createDetailPurchaseOrder, getListDetailPurchaseOrder,  gettotalDetailPurchaseOrder, updateAplicarDetailPurchaseOrder, getDetailPurchaseOderInfo, gettotalIDPDetailPurchaseOrder, getAmountFuelPurchase, getAmountFuelPurchaseRegular, getAmountFuelPurchaseSuper, getAmountFuelPurchaseDiesel } = require('../../controllers/purchases/detailPurchaseOrder.controllers');
const { validateJWT } = require('../../middleware/validate-jwt.middleware');

const router = Router();

router.post('/', [validateJWT], createDetailPurchaseOrder);
router.post('/listPurchaseDetail', [validateJWT], getListDetailPurchaseOrder);
router.post('/amountFuel', [validateJWT], getAmountFuelPurchase)
router.post('/amountFuelRegular', [validateJWT], getAmountFuelPurchaseRegular)
router.post('/amountFuelSuper', [validateJWT], getAmountFuelPurchaseSuper)
router.post('/amountFuelDiesel', [validateJWT], getAmountFuelPurchaseDiesel)
router.get('/totalDetailPurchase', [validateJWT], gettotalDetailPurchaseOrder);
router.get('/aplicarDetailOrder', [validateJWT], updateAplicarDetailPurchaseOrder);
router.post('/detailPurchaseOderInfo',[validateJWT], getDetailPurchaseOderInfo);
router.get('/totalIDPDetailPurchase', [validateJWT], gettotalIDPDetailPurchaseOrder);
module.exports = router;