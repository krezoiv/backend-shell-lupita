/**
 * 
 */
const User = require( '../models/users/users.model' );


const isADMIN_ROLE = async ( req, res, next ) => {
 
    const userId = req.userId;
    try {
        const  userDB = await User.findById(userId);

        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: 'Usuario no Existe'
            });
        }

       if(userDB.roleId === 'ADMIN_ROLE'){
        return res.status(403).json({
            ok: false,
            msg: 'Sin Privilegios...'
        })
       }

        next();
    } catch (error) {
        console.log(error);
        return res.status( 403 ).json({
            ok: false,
            msg: 'Permisos insuficientes1'
        });
    };
   
   

}
const isSUPER_ROLE = async ( req, res, next ) => {
 
    const userId = req.userId;
    try {
        const  userDB = await User.findById(userId);

       if(userDB.roleId ==='SUPER_ROLE'){
        return res.status(403).json({
            ok: false,
            msg: 'Sin Privilegios....'
        })
       }
       next();
    } catch (error) {
        console.log(error);
        return res.status( 403 ).json({
            ok: false,
            msg: 'Permisos insuficientes1'
        });
    };
}

const isUSER_ROLE = async ( req, res, next ) => {
 
    const userId = req.userId;
    try {
        const  userDB = await User.findById(userId);

       if(userDB.roleId === 'USER_ROLE'){
        return res.status(403).json({
            ok: false,
            msg: 'Sin Privilegios....'
        })
       }
       next();
    } catch (error) {
        console.log(error);
        return res.status( 403 ).json({
            ok: false,
            msg: 'Permisos insuficientes1'
        });
    };

}

const isGUEST_ROLE = async ( req, res, next ) => {
 
    const userId = req.userId;
    try {
        const  userDB = await User.findById(userId);

       if(userDB.roleId === 'GUEST_ROLE'){
        return res.status(403).json({
            ok: false,
            msg: 'Sin Privilegios....'
        })
       }
       next();
    } catch (error) {
        console.log(error);
        return res.status( 403 ).json({
            ok: false,
            msg: 'Permisos insuficientes1'
        });
    };

}





module.exports = {
    isADMIN_ROLE,
    isSUPER_ROLE,
    isUSER_ROLE,
    isGUEST_ROLE
    
}
