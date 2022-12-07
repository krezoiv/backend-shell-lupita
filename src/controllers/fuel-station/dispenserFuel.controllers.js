/**
 * controller that allows to assign type of fuel to a dispensing pump
 * controlador que permite asignar tipo de combustible a una bomba dispensador
 */

const { response } = require('express');
const DispenserFuel = require('../../models/fuel-station/dispenserFuel.model');


const getDispenserFuel = async (req, res = response) => {

    try {
        const dispenserFuel = await DispenserFuel.find({}, 'dispenserId statusId')
        res.json({
            ok: true,
            dispenserFuel
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const createDispenserFuel = async(req, res = response) => {

    try {
        const dispenserFuel = new DispenserFuel(req.body);
        await dispenserFuel.save();

        res.json({
            ok: true,
            msg: dispenserFuel
        });

    } catch (error) {
    
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

module.exports = {
    getDispenserFuel,
    createDispenserFuel
}