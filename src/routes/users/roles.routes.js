/**
 * 
 * Rutas roles
 * /api/roles/
 */  

 const { Router } = require( 'express' );
 const { createRole, getRoles } = require('../../controllers/users/roles.controllers');
 
 const router = Router();
 
 
 
 router.post('/', createRole);
 router.get('/', getRoles);
 
 module.exports = router;