/**
 * setting to connect to data base
 * ajustes de base de datos
 * se termino de configurar
 */
const mongoose = require('mongoose');

const dbConnection = async () =>{

   try {
       
        await mongoose.connect( process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
   });

   console.log(" Shell Lupita Database ONLINE...")

} catch (error) {

    console.log(error)
    throw new Error('Database connection failed')
       
   }
   
}

module.exports ={
    dbConnection
}