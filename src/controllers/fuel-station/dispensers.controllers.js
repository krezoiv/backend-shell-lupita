/**
 *  crud pump controller
 *  controlador de dispensadores
 */
const { response } = require('express');
const Dispenser = require('../../models/fuel-station/dispensers.model');

//gets all dispensers
const getDispenser = async (req, res = response) => {

    try {
        const dispenser = await Dispenser.find({}, 'dispenserCode islandId statusId')
            .populate({
                path: 'islandId'
            })
            .populate({
                path: 'statusId'
            });

        res.json({
            ok: true,
            dispenser
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get dispenser  A
const gerDisenserA = async(req, res = response) => {
    
    try {
        const dispenserA = await Dispenser.find({},'dispenserCode')
            .sort({dispenserCode: 1}).limit(1);
        res.json({
            ok: true,
            dispenserA
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//get dispenser  B
const gerDisenserB = async(req, res = response) => {
    
    try {
        const dispenserB = await Dispenser.find({},'dispenserCode')
            .sort({dispenserCode: -1}).limit(1);
        res.json({
            ok: true,
            dispenserB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}


//get onlys actives dispenserss
const getDispensersActive = async (req, res = response) => {

    try {
        const dispenser = await Dispenser.find({ statusId: '633f0e5bdcc030846c271119' }, 'dispenserCode islandId statusId')
            .populate({
                path: 'islandId'
            })
            .populate({
                path: 'statusId'
            });

        res.json({
            ok: true,
            dispenser
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//creats a new dispenser
const createDispenser = async (req, res = response) => {

    try {

        const dispenser = new Dispenser(req.body);
        await dispenser.save();

        res.json({
            ok: true,
            msg: dispenser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

};


//updte dipensers
const updateDispenser = async (req, res = response) => {

    const dispenserId = req.params.id;

    try {
        const dispenser = await Dispenser.findById(dispenserId)
        if (!dispenser) {
            return res.status(400).json({
                ok: false,
                msg: 'Combustible no encontrado'
            });
        }

        const DispenserChanges = {
            ...req.body
        };

        const dispenserUpdated = await Dispenser.findByIdAndUpdate(dispenserId, DispenserChanges, { new: true });

        res.json({
            ok: true,
            fuels: dispenserUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });
    }
}


//delete dispensers
const deleteDispenser = async(req, res = response) => {
    const dispenserId =req.params.id;

    try {
        const dispenser = await Dispenser.findById(dispenserId);
        if(!dispenser){
            return res.json({
                ok: false,
                msg : 'Bombda no encontrado'
            });
        };

        const dispenserChanges ={
            statusId : "633f0e55dcc030846c271117"
        }

        const dispenserDeleted = await Dispenser.findByIdAndUpdate(dispenserId, dispenserChanges, {new: true});
        res.json({
            ok: true,
            msg: 'Eliminado',
            fuel : dispenserDeleted
        });
        
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

module.exports = {
    getDispenser,
    createDispenser,
    updateDispenser,
    deleteDispenser,
    getDispensersActive,
    gerDisenserA,
    gerDisenserB
};