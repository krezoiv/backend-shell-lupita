/**
 * 
 */
require('dotenv').config();
const morgan  = require('morgan');
const cors =require( 'cors' );
const express = require('express');
const { createRoles, createSides, createGallonsMargin} = require( './library/intital-setup.lib' );
const { dbConnection } = require('./database/configuration');




//crear servidor express
const app = express();


createSides();

app.use(morgan('dev'));
//configuracion de los cors
app.use( cors() );

//lectura y parseo del body
app.use( express.json() );

// Conexion a la base de datos
dbConnection();


//Rutas


app.use( '/api/users', require('./routes/users/users.routes'));
app.use( '/api/roles', require('./routes/users/roles.routes'));
app.use( '/api/status', require('./routes/status/status.routes'));
app.use( '/api/login', require( './routes/users/auth.routes' ));
app.use( '/api/orders', require( './routes/purchases/purchaseOrder.routes' ));

app.use( '/api/fuels', require( './routes/fuel-station/fuels.routes' ));
app.use( '/api/dispensers', require( './routes/fuel-station/dispensers.routes' ));
app.use( '/api/dispenserReaders', require( './routes/fuel-station/dispenserReaders.routes' ));
app.use( '/api/dispenserFuel', require( './routes/fuel-station/dispenserFuel.routes' ));
app.use( '/api/islands', require( './routes/fuel-station/islands.routes' ));
app.use( '/api/fuelTanks', require( './routes/fuel-station/fuelTanks.routes') );
app.use( '/api/hoses', require( './routes/fuel-station/hoses.routes') );
app.use( '/api/sideDispenser', require( './routes/fuel-station/sidesdispenser.routes') );
app.use( '/api/assignmentHose',require( './routes/fuel-station/assignmentHose.routes' ));
app.use( '/api/assignment',require( './routes/fuel-station/assignmente.routes' ));
app.use( '/api/generalDispenserReader',require( './routes/fuel-station/generalDispenserReader.routes' ));
app.use('/api/fuelInventory', require('./routes/fuel-station/fuelInventory.routes'));

app.use( '/api/paymentMethods',require( './routes/documents/paymentMethods.routes' ));


app.use( '/api/store',require( './routes/persons/store.routes' ));
app.use( '/api/vehicles',require( './routes/persons/vehicles.routes' ));

app.use( '/api/detailPurchaseOrder',require( './routes/purchases/detailPurchaseOrder.routes' ));
app.use( '/api/purchaseOrders',require( './routes/purchases/purchaseOrder.routes' ));
app.use( '/api/purchases',require( './routes/purchases/purchases.routes' ));
app.use( '/api/salesControl', require('./routes/sales/salesControl.routes'));
app.use('/api/fuelPendingDispatch', require('./routes/purchases/fuelPendigDispatch.routes'));


app.use( '/api/status',require( './routes/status/status.routes' ));
app.use( '/api/issued',require( './routes/status/issued.routes' ));


app.use( '/api/taxes',require( './routes/accounting/taxes.routes' ));

app.listen( 3000 , ()=> {
    console.log('Servidor corriendo en puerto => ' + 3000);
});

