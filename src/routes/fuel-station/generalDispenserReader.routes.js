

const { Router } = require( 'express');
const { createGeneralDispenserReader, getGeneralDispenserReader, getTotals, updateTotalGallons, getTotalRegularGallons, getTotalSuperGallons, getTotalDieselGallons, countGallonsRegular, countGallonsSuper, countGallonsDiesel, getGeneralDispenserReaderByDate, uptadeCloseMonthReader, deleteGeneralDispenserReaderDetails, countTotalGallonsSalesByDate, countTotalRegularGallonsSalesByDate, countTotalSuperGallonsSalesByDate, countTotalDieselGallonsSalesByDate, deleteSales, readTotalGallonRegular, readTotalMechanicRegular, readTotalMoneyRegular, readTotalGallonRegularDB, readTotalGallonDB, getLastGeneralDispenserReader, getGeneralDispenserReadertoCLoseMonth, updateTotalGallonsByUdpdatingRegular, updateTotalGallonsByUdpdatingDiesel, updateTotalGallonsByUdpdatingSuper } = require('../../controllers/fuel-station/generalDispenserReader.controllers');
const { validateJWT } = require( '../../middleware/validate-jwt.middleware');
const { isSUPER_ROLE, isADMIN_ROLE, isGUEST_ROLE, isUSER_ROLE } = require('../../middleware/validate-roles.middleware');

const router = Router();


router.get('/getTotalGallons', [validateJWT], getTotals);
router.post('/', [validateJWT], createGeneralDispenserReader);
router.post('/generalDispenserReader', [validateJWT], getGeneralDispenserReader);
router.post('/totalRegularGallons', [validateJWT], getTotalRegularGallons);
router.post('/totalSuperGallons', [validateJWT], getTotalSuperGallons);
router.post('/totalDieselGallons', [validateJWT], getTotalDieselGallons);
router.put ('/totalGallons/:id', [validateJWT], updateTotalGallons);
router.get('/countGallonsRegular', [validateJWT], countGallonsRegular);
router.get('/countGallonsSuper', [validateJWT], countGallonsSuper);
router.get('/countGallonsDiesel', [validateJWT], countGallonsDiesel);
router.post('/dates', [validateJWT], getGeneralDispenserReaderByDate);
router.post('/updateApplied', [validateJWT, isGUEST_ROLE], uptadeCloseMonthReader)
router.post('/deleteDetail',  [validateJWT, isUSER_ROLE, isGUEST_ROLE], deleteGeneralDispenserReaderDetails);
router.post('/countSumRegularGallonsSalesByDate', [validateJWT], countTotalRegularGallonsSalesByDate);
router.post('/countSumSuperGallonsSalesByDate', [validateJWT], countTotalSuperGallonsSalesByDate);
router.post('/countSumDieselGallonsSalesByDate', [validateJWT], countTotalDieselGallonsSalesByDate);
router.post('/deleteSale',  [validateJWT, isUSER_ROLE, isGUEST_ROLE], deleteSales);
router.post('/gallonRegular',  [validateJWT], readTotalGallonDB);
router.post('/mechanicRegular',  [validateJWT], readTotalMechanicRegular);
router.post('/moneyRegular',  [validateJWT], readTotalMoneyRegular);
router.get('/getLastGeneralDispenserReader', [validateJWT], getLastGeneralDispenserReader);
router.post('/getGeneralDispenserReadertoCLoseMonth', [validateJWT], getGeneralDispenserReadertoCLoseMonth);
router.post('/updateTotalGallonsByUdpdatingRegular', updateTotalGallonsByUdpdatingRegular);
router.post('/updateTotalGallonsByUdpdatingSuper', updateTotalGallonsByUdpdatingSuper)
router.post('/updateTotalGallonsByUdpdatingDiesel', updateTotalGallonsByUdpdatingDiesel)

module.exports = router;