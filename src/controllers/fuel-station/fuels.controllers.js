
/**
 * controller for fuels
 */
const { response } = require('express');
const Fuels = require('../../models/fuel-station/fuels.model');
const Taxes = require('../../models/accounting/taxes.models');

const getFuels = async (req, res = response) => {

    try {
        const fuels = await Fuels.find({}, 'fuelName costPrice salePrice statusId taxesId')
            .populate('statusId', 'statusName')
            .populate('taxesId', 'idpAmount')  
        res.json({
            ok: true,
            fuels
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
};

//gets idp fuels
const getFuelsIdp = async (req, res = response) => {

    const { fuelId } = req.body;
    try {
        const fuels = await Fuels.findById((fuelId), 'taxesId')
        .populate('taxesId', 'idpAmount')
        res.json({
            ok: true,
            fuels
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
};


//gets fuels active only
const getFuelsActive = async (req, res = response) => {

    try {
        const fuels = await Fuels.find({ statusId: '633f0e5bdcc030846c271119' }, 'fuelName costPrice salePrice taxesId')
            .populate('statusId', 'statusName')
            .populate('taxesId', 'idpAmount')
        res.json({
            ok: true,
            fuels
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
};



//creats a new fuel, crea un nuevo combustible
const createFuel = async (req, res = response) => {
    try {
        const fuel = new Fuels(req.body);
        await fuel.save();

        res.json({
            ok: true,
            msg: fuel
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
          
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//update fuels, modifca combustible
const updateFuel = async (req, res = response) => {

    const fuelId = req.params.id;
    const taxesId = req.params.id;
    const userId = req.userId;

    try {
        const fuel = await Fuels.findById(fuelId);
        if (!fuel) {
            return res.status(400).json({
                ok: false,
                msg: 'Combustible no encontrado'
            });
        };

        const fuelChanges = {
            ...req.body,
            usuario: userId
        };

        const fuelUpdated = await Fuels.findByIdAndUpdate(fuelId, fuelChanges, { new: true });
        const taxesUpdated = await Taxes.findByIdAndUpdate(taxesId, fuelChanges, {new : true});
        res.json({
            ok: true,
            fuels: fuelUpdated,
            taxesUpdated
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });
    };
};

//updates price o fules, modifica precio decombustibles
const updatePrice = async (req, res = response) => {

    const fuelId = req.params.id;
    const userId = req.userId;

    try {
        const fuel = await Fuels.findById(fuelId);
        if (!fuel) {
            return res.status(400).json({
                ok: false,
                msg: 'Combustible no encontrado'
            });
        }

        const { costPrice, salePrice } = req.body

        if (fuel.costPrice === costPrice) {
            return res.status(400).json({
                ok: false,
                msg: 'NO se ha modificado precio de Costo'
            });
        };

        if (fuel.salePrice === salePrice) {
            return res.status(400).json({
                ok: false,
                msg: 'NO se ha modificado precio de Venta'
            });
        };

        if (fuel.salePrice === costPrice) {
            return res.status(400).json({
                ok: false,
                msg: 'Precio venta y costo es igual'
            });
        };

        if (salePrice === costPrice) {
            return res.status(400).json({
                ok: false,
                msg: 'Precio venta y costo es igual'
            });
        };

        if (salePrice <= costPrice) {
            return res.status(400).json({
                ok: false,
                msg: 'Precio venta es menor al precio costo'
            });
        };


        const fuelChanges = {
            ...req.body
        };

        const fuelUpdated = await Fuels.findByIdAndUpdate(fuelId, fuelChanges, { new: true });
        const taxes = await 
        res.json({
            ok: true,
            fuels: fuelUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });
    };

}


//delete fuels, elimina combustible
const deleteFuel = async (req, res = response) => {

    const fuelId = req.params.id;
    const userId = req.userId;

    try {
        const fuel = await Fuels.findById(fuelId);
        if (!fuel) {
            return res.json({
                ok: false,
                msg: 'Combustible no encontrado'
            });
        };

        const fuelChanges = {
            statusId: "622eb1b7ea4a14a46dbc83bb",
            usuario: userId
        };

        const fuelDeleted = await Fuels.findByIdAndUpdate(fuelId, fuelChanges, { new: true });
        res.json({
            ok: true,
            msg: 'Eliminado',
            fuel: fuelDeleted
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
}

module.exports = {
    getFuels,
    createFuel,
    updateFuel,
    deleteFuel,
    updatePrice,
    getFuelsActive,
    getFuelsIdp
};