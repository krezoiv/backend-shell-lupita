const {Router} = require('express');
const { createSalesControl, getNoDocument, getSaleByNoDocument, getSaleByDates, getAllSales, countTotalSalesByDate, countTotalGallonsSalesByDate, countSales, getGreaterSale, getLesserSale, getGreaterRegularGallons, getLesserRegularGallons, getGreaterSuperGallons, getLesserSuperGallons, getGreaterDieselGallons, getLesserDIeselGallons, lastSaleControl } = require('../../controllers/sales/salesControl.controller');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');
const { isAdministratorRole, isSuperRol } = require('../../middleware/validate-roles.middleware');

const router = Router();

router.post('/', [validateJWT], createSalesControl);
router.get('/', [validateJWT], getAllSales);
router.get('/countSales', [validateJWT], countSales);
router.get('/noDocumentSales', [validateJWT], getNoDocument);
router.post('/saleByNoDocument', [validateJWT], getSaleByNoDocument);
router.post('/salesByDate', [validateJWT], getSaleByDates);
router.post('/countSumSalesByDate', [validateJWT], countTotalSalesByDate);
router.post('/greaterSaleByDate', [validateJWT], getGreaterSale);
router.post('/lessserSaleByDate', [validateJWT], getLesserSale);
router.post('/greaterRegularGallon', [validateJWT], getGreaterRegularGallons);
router.post('/lesserRegularGallon', [validateJWT], getLesserRegularGallons);
router.post('/greaterSuperGallon', [validateJWT], getGreaterSuperGallons);
router.post('/lesserSuperGallon', [validateJWT], getLesserSuperGallons);
router.post('/greaterDieselGallon', [validateJWT], getGreaterDieselGallons);
router.post('/lesserDieselGallon', [validateJWT], getLesserDIeselGallons);
router.get('/lastSaleControl',[validateJWT], lastSaleControl)

module.exports = router;