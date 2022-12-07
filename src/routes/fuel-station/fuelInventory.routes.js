const {Router} = require('express');
const { createFuelInventory, readInventory, getFuelInventoryId, getFuelInventoryAmountPending,
        updateAmountPending, getFuelInventoryAvailable, updateAvailableRegular, updateAvailableSuper, 
        updateAvailableDiesel, getFuelInventoryCode, getFuelIdRegular, getFuelIdSuper, getFuelIdDiesel, 
        updateAvailableRegularSale, updateAvailableDieselSale, updateAvailableSuperSale, getFuelInventoryAvailablebyCode, getFuelRegularByCode, getFuelSuperByCode, getFuelDieselBycode, updateAvailableGallonsSale, updateAvailableGallonsPurchase} = require('../../controllers/fuel-station/fuelInventory.controllers');
        const {validateJWT} = require('../../middleware/validate-jwt.middleware')

const router = Router();

router.get('/', [validateJWT], readInventory);
router.get('/fuelIdRegular', [validateJWT], getFuelIdRegular);
router.get('/fuelIdSuper', [validateJWT], getFuelIdSuper);
router.get('/fuelIdDiesel', [validateJWT], getFuelIdDiesel);
router.get('/fuelRegularByCode', [validateJWT], getFuelRegularByCode);
router.get('/fuelSuperByCode', [validateJWT], getFuelSuperByCode);
router.get('/fuelDieselByCode', [validateJWT], getFuelDieselBycode);
router.post('/', [validateJWT], createFuelInventory);
router.post('/fuelInventoryId', [validateJWT], getFuelInventoryId);
router.post('/inventoryCode', [validateJWT], getFuelInventoryCode)
router.post('/fuelInventoryAmountPending', [validateJWT], getFuelInventoryAmountPending);
router.post('/fuelInventoryAvailable', [validateJWT], getFuelInventoryAvailable);
router.post('/fuelInventoryAvailableCode', [validateJWT], getFuelInventoryAvailablebyCode);
router.put('/:id', [validateJWT], updateAmountPending);
router.post('/updateAvailableGallonsPurchase', [validateJWT], updateAvailableGallonsPurchase);
router.post('/updateAvailableGallonsSale', [validateJWT], updateAvailableGallonsSale);


module.exports = router;