/**
 * controllers for vehicle
 */
const {response} = require('express');
const Vehicle = require('../../models/persons/vehicles.model');


//creates a new vehicle
const createVehicle = async(req, res = responser) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.json({
            ok: true,
            msg: vehicle
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets all vehicle
const getVehicule = async(req, res = response) => {
    
    try {
        const vehicle = await Vehicle.find({}, 'vehicleName');
        res.json({
            ok: true,
            vehicle,
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}


module.exports = {
    createVehicle,
    getVehicule
}