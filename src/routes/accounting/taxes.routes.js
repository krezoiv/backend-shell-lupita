const {Router} = require('express');
const { createTaxes, getTaxes } = require('../../controllers/accounting/taxes.controllers');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');
const { isSUPER_ROLE, isADMIN_ROLE, isUSER_ROLE, isGUEST_ROLE } = require('../../middleware/validate-roles.middleware');

const router = Router();

router.post('/',  [validateJWT,isUSER_ROLE, isGUEST_ROLE], createTaxes);
router.get('/',  [validateJWT,isUSER_ROLE, isGUEST_ROLE], getTaxes);

module.exports = router;