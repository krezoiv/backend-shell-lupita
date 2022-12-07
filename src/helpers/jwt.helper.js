/**
 * 
 */
const jsonWebToken =  require( 'jsonwebtoken')


const generateJWT = ( userId) => {


    return new Promise( ( resolve, reject ) => {

        const payload ={
            userId,
          
        };
    
        jsonWebToken.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn : '5h'
        }, (err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'Imposible gener token..!!' );
            } else {
                resolve( token );
            };
        });
    })
    
   
};

module.exports = {
    generateJWT
}