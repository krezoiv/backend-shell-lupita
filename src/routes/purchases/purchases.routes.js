/**
 * 
 */
const { Router } = require( 'express' );
const { createPurchase, getPurchaseByDates, countTotalPurchaseByDate, countTotalPurchaseRegularGallonsByDates, countTotalPurchaseSuperGallonsByDates, countTotalPurchaseDieselGallonsByDates, getGreaterPurchase, getLesserPurchase, getGreaterPurchaseRegular, getLesserPurchaseRegular, getGreaterPurchaseSuper, getLesserPurchaseSuper, getGreaterPurchaseDiesel, getLesserPurchaseDiesel, getPurchaseId, getPurchaseByNoOrder, deleteDetailPurchaseOrderSuper, deletePurchase, getPendingPurchases, appliedPurchase } = require('../../controllers/purchases/purchases.controllers');
const { validateJWT } = require('../../middleware/validate-jwt.middleware');
const { isSUPER_ROLE, isADMIN_ROLE, isGUEST_ROLE, isUSER_ROLE } = require('../../middleware/validate-roles.middleware');

const router = Router();

router.post('/', [validateJWT], createPurchase);
router.post('/purchasesBYDates', [validateJWT], getPurchaseByDates);
router.post('/purchaseByOrder', [validateJWT], getPurchaseByNoOrder)
router.post('/countSumPurchaseByDate', [validateJWT], countTotalPurchaseByDate);
router.post('/totalGallonsRegularByDates', [validateJWT], countTotalPurchaseRegularGallonsByDates);
router.post('/totalGallonsSuperByDates', [validateJWT], countTotalPurchaseSuperGallonsByDates);
router.post('/totalGallonsDieselByDates', [validateJWT], countTotalPurchaseDieselGallonsByDates);
router.post('/greaterPurchase', [validateJWT], getGreaterPurchase);
router.post('/lesserPurchase', [validateJWT], getLesserPurchase);
router.post('/greaterPurchaseRegular', [validateJWT], getGreaterPurchaseRegular);
router.post('/lesserPurchaseRegular', [validateJWT], getLesserPurchaseRegular);
router.post('/greaterPurchaseSuper', [validateJWT], getGreaterPurchaseSuper);
router.post('/lesserPurchaseSuper', [validateJWT], getLesserPurchaseSuper);
router.post('/greaterPurchaseDiesel', [validateJWT], getGreaterPurchaseDiesel);
router.post('/lesserPurchaseDiesel', [validateJWT], getLesserPurchaseDiesel);
router.post('/idPurchase',[validateJWT],getPurchaseId)
router.post('/deletePurchase',  [validateJWT, isGUEST_ROLE, isUSER_ROLE], deletePurchase)
router.post('/getPendingPurchases', [validateJWT], getPendingPurchases),
router.post('/appliedPurchase', [validateJWT, isGUEST_ROLE],appliedPurchase)

module.exports = router;