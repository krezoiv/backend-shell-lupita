

const {Router} = require('express');
const {  createAssignmentHose, getAssignmentHose, getAssignmentHoseId, getAssignmentHoseData } = require('../../controllers/fuel-station/assignmentHose.controllers');
const {validateJWT} = require('../../middleware/validate-jwt.middleware');


const router = Router();

router.post('/getAssig', [validateJWT], getAssignmentHose)
router.post('/', [validateJWT], createAssignmentHose);
router.post('/assignmentHoseId', getAssignmentHoseId);

module.exports = router;