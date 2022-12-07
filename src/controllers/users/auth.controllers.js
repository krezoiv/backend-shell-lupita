/**
 * 
 */
const bcrypt = require( 'bcryptjs' );
const { response } = require( 'express' );
const { generateJWT } = require('../../helpers/jwt.helper');

const User = require( '../../models/users/users.model' );
const Status = require( '../../models/status/status.models' );



const loggedUser = async(req, res = response) =>{
    const { email } = req.body;

    try {
        const userDB = await User.findOne({"email": email}, 'firstName' );
        res.json({
            ok: true,
            userDB
        });
    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        })
    }
}

const login = async( req, res = response ) =>{

    const { email, password } = req.body;
    
    try {
        
        const userDB = await User.findOne( {email} );
      


            if ( !userDB ) {
                return res.status( 404 ).json({
                    ok: false,
                    msg : ' correo no válidos'
                });
            };
    
            //verificar password
            const validatePass = bcrypt.compareSync( password, userDB.password );
    
            if (!validatePass ) {
                return res.status( 400 ).json({
                    ok:false,
                    msg: 'pass no válidos'
                });
            }

            
            const token = await generateJWT( userDB.id ); 
            res.json({
                ok: true,
                 token
                 
            }); 
        
        }

        catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        })
    }
}

const renewToken = async (req, res = response) =>{

    const userId = req.userId;

    const token = await generateJWT(userId);
    const usuario = await User.findById(userId)
   
    res.json({
        ok : true,
        token,
        usuario
       
    })
};


module.exports ={
    login, renewToken,
    loggedUser
}