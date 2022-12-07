/**
 * controller for fuel tanks
 */

const { response } = require('express');
const FuelTank = require('../../models/fuel-station/fuelTanks.model')


//gets al fuels tanks
const getFuelTanks = async (req, res = response) => {

    try {
        const fuelTank = await FuelTank.find({}, 'tankName maxStorage gallonsStoraged fuelId statusId')
            .populate({
                path: 'statusId'
            })
            .populate({
                path: 'fuelId'
            });

        res.json({
            ok: true,
            fuelTank
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

};

/**
 * *to get fuel tank Id 
 * *obtener el id del tanque de comubustible
 * @parametos fuelId
 */
const getFuelTankId = async (req, res = response) => {
    try {
        const { fuelId } = req.body;
        const fuelTankId = await FuelTank.findOne({
            "fuelId": fuelId
        }, 'fuelTankId');

        res.json({
            ok: true,
            fuelTankId
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}


//create a new fuel tank, crea un nuevo tanque
const createFuelTank = async (req, res = response) => {

    try {
        const fueltank = new FuelTank(req.body);
        await fueltank.save();
        res.json({
            ok: true,
            msg: fueltank
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    }
}

//update tanks, modifica los tanques
const updateFuelTank = async (req, res = response) => {
    const fuelTankId = req.params.id;

    try {
        const fuelTank = await FuelTank.findById(fuelTankId);
        if (!fuelTank) {
            return res.status(400).json({
                ok: false,
                msg: 'Tanque no encontrado'
            });
        };

        const fuelTankChanges = {
            ...req.body
        };

        const fuelTankUpdate = await FuelTank.findByIdAndUpdate(fuelTankId, fuelTankChanges, { new: true });
        res.json({
            ok: true,
            fuels: fuelTankUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });

    }
}


//delet tanks,elimina tanque
const deleteTankFuel = async (req, res = response) => {
    const fuelTankId = req.params.id;

    try {
        const fuelTank = await FuelTank.findById(fuelTankId);
        if (!fuelTank) {
            return res.json({
                ok: false,
                msg: 'Tanque no encontrado'
            });
        };

        const fuelTankChanges = {
            statusId: "622eb1b7ea4a14a46dbc83bb"

        }

        const fuelTankDelete = await FuelTank.findByIdAndUpdate(fuelTankId, fuelTankChanges, { new: true });
        res.json({
            ok: true,
            msg: 'Eliminado',
            fuel: fuelTankDelete
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
    getFuelTanks,
    getFuelTankId,
    createFuelTank,
    updateFuelTank,
    deleteTankFuel
}
