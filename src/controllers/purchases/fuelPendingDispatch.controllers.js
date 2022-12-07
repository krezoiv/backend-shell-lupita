/***
 * controller fuel pending dispatch
 */

const {response} = require('express');

const FuelPendingDispatch  = require('../../models/purchases/fuelPendingDispatch.model');


const createFuelPendingDispatch = async (req, res = response) => {

    try {
        const pendingDispatch = new FuelPendingDispatch(req.body);
        await pendingDispatch.save();
        res.json({
            ok: true,
           msg: pendingDispatch
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

module.exports = {
    createFuelPendingDispatch
}