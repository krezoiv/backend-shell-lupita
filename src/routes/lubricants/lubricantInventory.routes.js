

const { Router } = require('express');
const { readLubricantInventory, createLubricantInventory, saleLubricantInventory } = require('../../controllers/lubricants/lubricantsInventroy.controllers');
const { validateJWT } = require('../../middleware/validate-jwt.middleware');

const router = Router();

router.get('/', [validateJWT], readLubricantInventory );
router.post('/', [validateJWT], createLubricantInventory);
router.post('/salesLubricant', saleLubricantInventory)


module.exports = router;