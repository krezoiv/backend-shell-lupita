/**
 * 
 */
const jsonWebToken =  require( 'jsonwebtoken' );

const validateJWT = ( req, res, next ) => {

    //para ler el token
    const token = req.header( 'jwt-token');

    if ( !token ) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'No se encontró token'
        });

    };

    try {
        const { userId } = jsonWebToken.verify( token, process.env.JWT_SECRET_KEY );
        req.userId = userId;
        next();
     
    } catch (error) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'Token no es válido'
        });
    };

};

module.exports = {
    validateJWT
}