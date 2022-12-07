/**
 * 
 */
const { json } = require('express/lib/response');
const Roles = require( '../../models/users/roles.model' );


const createRole = async (req, res ) => {

    const { roleName } = req.body;
    const role = new Roles (req.body); 

    await role.save();

    res.json({
        ok: true,
        role
    });
};

const getRoles = async ( req, res ) => {
    
    const roles = await Roles.find( {}, ' roleName' );

    res.json({
        ok: true,
        roles
    })
}

module.exports = {
    createRole,
    getRoles
}