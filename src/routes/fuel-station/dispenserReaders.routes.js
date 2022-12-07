/**
 * 
 */
const { Router } = require('express');
const { createDispenserReader, getPreviousNumberGallonRegular, getPreviousNumberMechanicRegular, getPreviousNumberMoneyRegular,
    getPreviousNumberGallonSuper, getPreviousNumberMechanicSuper, getPreviousNumberMoneySuper,
    getPreviousNumberGallonDiesel, getPreviousNumberMechanicDiesel, getPreviousNumberMoneyDiesl,
    getPreviousNumberGallonVpower, getPreviousNumberMechanicVpower, getPreviousNumberMoneyVpower, getResumeNumerationDispenser,
    updateDispenserReader, penultimateNumberGallonRegular, getPreviousNumberGallonRegular1, getPreviousNumberMechanicRegular1,
    getPreviousNumberMoneyRegular1, getPreviousNumberGallonSuper1, getPreviousNumberMechanicSuper1, getPreviousNumberMoneySuper1,
    getPreviousNumberGallonDiesel1, getPreviousNumberMechanicDiesel1, getPreviousNumberMoneyDiesel1, getPreviousTotalNoGallonRegular,
    getPreviousTotalNoMechanicRegular, getPreviousTotalNoMoneyRegular, getPreviousTotalNoGallonSuper, getPreviousTotalNoMechanicSuper, getPreviousTotalNoMoneySuper, getPreviousTotalNoGallonDiesel, getPreviousTotalNoMechanicDiesel, getPreviousTotalNoMoneyDiesel, getResumeLastNumerationDispenser } = require('../../controllers/fuel-station/dispenserReader.controllers');


const { validateJWT } = require('../../middleware/validate-jwt.middleware')

const router = Router();

router.post('/', [validateJWT], createDispenserReader);
router.post('/previousGallonRegular', [validateJWT], getPreviousNumberGallonRegular);
router.post('/previousMechanicRegular', [validateJWT], getPreviousNumberMechanicRegular);
router.post('/previousMoneyRegular', [validateJWT], getPreviousNumberMoneyRegular);
router.post('/previousGallonRegular1', [validateJWT], getPreviousNumberGallonRegular1);
router.post('/previousMechanicRegular1', [validateJWT], getPreviousNumberMechanicRegular1);
router.post('/previousMoneyRegular1', [validateJWT], getPreviousNumberMoneyRegular1);
router.post('/previousTotalNoGallonRegular', [validateJWT], getPreviousTotalNoGallonRegular);
router.post('/previousTotalNoMechanicRegular', [validateJWT], getPreviousTotalNoMechanicRegular);
router.post('/previousTotalNoMoneyRegular', [validateJWT], getPreviousTotalNoMoneyRegular);

router.post('/penultimateGallonRegular', [validateJWT], penultimateNumberGallonRegular);

router.post('/previousGallonSuper', [validateJWT], getPreviousNumberGallonSuper);
router.post('/previousMechanicSuper', [validateJWT], getPreviousNumberMechanicSuper);
router.post('/previousMoneySuper', [validateJWT], getPreviousNumberMoneySuper);
router.post('/previousGallonSuper1', [validateJWT], getPreviousNumberGallonSuper1);
router.post('/previousMechanicSuper1', [validateJWT], getPreviousNumberMechanicSuper1);
router.post('/previousMoneySuper1', [validateJWT], getPreviousNumberMoneySuper1);
router.post('/previousTotalNoGallonSuper', [validateJWT], getPreviousTotalNoGallonSuper);
router.post('/previousTotalNoMechanicSuper', [validateJWT], getPreviousTotalNoMechanicSuper);
router.post('/previousTotalNoMoneySuper', [validateJWT], getPreviousTotalNoMoneySuper);

router.post('/previousGallonDiesel', [validateJWT], getPreviousNumberGallonDiesel);
router.post('/previousMechanicDiesel', [validateJWT], getPreviousNumberMechanicDiesel);
router.post('/previousMoneyDiesel', [validateJWT], getPreviousNumberMoneyDiesl);
router.post('/previousGallonDiesel1', [validateJWT], getPreviousNumberGallonDiesel1);
router.post('/previousMechanicDiesel1', [validateJWT], getPreviousNumberMechanicDiesel1);
router.post('/previousMoneyDiesel1', [validateJWT], getPreviousNumberMoneyDiesel1);
router.post('/previousTotalNoGallonDiesel', [validateJWT], getPreviousTotalNoGallonDiesel);
router.post('/previousTotalNoMechanicDiesel', [validateJWT], getPreviousTotalNoMechanicDiesel);
router.post('/previousTotalNoMoneyDiesel', [validateJWT], getPreviousTotalNoMoneyDiesel);


router.post('/previousGallonVpower', [validateJWT], getPreviousNumberGallonVpower);
router.post('/previousMechanicVpower', [validateJWT], getPreviousNumberMechanicVpower);
router.post('/previousMoneyVpower', [validateJWT], getPreviousNumberMoneyVpower);

router.post('/listResumNumerationDispenser', [validateJWT], getResumeNumerationDispenser);
router.get('/listResumLastNumerationDispenser', [validateJWT], getResumeLastNumerationDispenser);
router.put('/update/:id', [validateJWT], updateDispenserReader);
//end



module.exports = router;