/**
 * 
 */
 const Roles = require( '../models/users/roles.model' );
 const SideDispenser = require('../models/fuel-station/sidedispenser.model');
 const GallonsMargin = require('../models/fuel-station/gallonsMargin.model');

 const createSides = async() => {
 
     try {
         const SidesCount = await SideDispenser.estimatedDocumentCount();
 
     if (SidesCount > 0 ) return;
     const sideValues = await Promise.all([
         new SideDispenser( {sideName: 'Lado A'} ).save(),
         new SideDispenser( {sideName: 'Lado B'} ).save(),
        
     ]);
 
     
     } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'

        });
         
     }
 }
 
 module.exports = {
    
     createSides,
    
 }