

const {Router} = require('express');
const { createAssignment, getidAssignment, getAssignment } = require('../../controllers/fuel-station/assignment.controllers');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');

const router = Router();

router.post('/', [validateJWT], createAssignment);
router.post('/idAssignment', [validateJWT], getidAssignment);
router.get('/:id', [validateJWT], getAssignment);

module.exports = router