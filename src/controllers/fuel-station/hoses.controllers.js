/**
 * controlador de mangueras
 * hose controller
 */

const { response } = require('express');
const Hoses = require('../../models/fuel-station/hoses.model');
const AssignmentHose = require('../../models/fuel-station/assignmentHose.model')


//gets all hoses assignables 
const getHoses = async (req, res = response) => {

    try {
        const hoses = await Hoses.find({}, 'hoseColor fuelId statusId code')
            .populate('fuelId', 'fuelName')
            .populate('statusId', 'statusName');

        res.json({
            ok: true,
            hoses
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};

//gets hose id using position
const getHoseIdByAssigmentHoseId = async (req, res = response) => {
    
    const { position } = req.body;
    try {
       
        //const hoseId = await Hoses.findOne({ $and: [{"assignmentId" : assignmentId}, {"position" : position}]}, 'hoseId');
       const hhose = await AssignmentHose.findOne({"position" : position}, 'hoseId');
        res.json({
            ok: true,
            hhose
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//ger fuel id using a hoseid
const getFuelIdByHoseId = async (req, res = response) => {

    const { code } = req.body;
    try {
        const fuelId = await Hoses.findOne({"code" : code}, 'fuelId' );

        res.json({
            ok: true,
            fuelId
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

}


//gets regular prices using code
const getRegularPrice = async (req, res = response) => {
    const code = 1;

    try {
        const regularPrice = await Hoses.findOne({ "code": code }, 'fuelId')
            .populate({ path: 'fuelId' });
        res.json({
            ok: true,
            regularPrice
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//gets super prices using code
const getSuperPrice = async (req, res = response) => {
    const code = 2;

    try {
        const superPrice = await Hoses.findOne({ "code": code }, 'fuelId')
            .populate({ path: 'fuelId' });
        res.json({
            ok: true,
            superPrice
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets diesel prices using code
const getDieselPrice = async (req, res = response) => {
    const code = 3;

    try {
        const dieselPrice = await Hoses.findOne({ "code": code }, 'fuelId')
            .populate({ path: 'fuelId' });
        res.json({
            ok: true,
            dieselPrice
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//it gets all active hoses
const getHosesActive = async (req, res = response) => {

    try {
        const hoses = await Hoses.find({ statusId: '633f0e5bdcc030846c271119' }, 'code hoseColor fuelId statusId')
            .populate('fuelId', 'fuelName')
            .populate('statusId', 'statusName');

        res.json({
            ok: true,
            hoses
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};


//creats a new hose
const createHose = async (req, res = response) => {

    try {
        const hose = new Hoses(req.body);
        await hose.save();

        res.json({
            ok: true,
            msg: hose
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};




//update hoses
const updateHose = async (req, res = response) => {
    const hoseId = req.params.id;

    try {
        const hose = await Hoses.findById(hoseId);
        if (!hose) {
            return res.status(400).json({
                ok: false,
                msg: 'Manguera no encontrada'
            });
        };

        const hoseChanges = {
            ...req.body
        }

        const hoseUpdated = await Hoses.findByIdAndUpdate(hoseId, hoseChanges, { new: true });
        res.json({
            ok: true,
            hoses: hoseUpdated
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });
    };
};


//delete a hose
const deleteHose = async (req, res = response) => {
    const hoseId = req.params.id;

    try {
        const hose = await Hoses.findById(hoseId);
        if (!hose) {
            return res.json({
                ok: false,
                msg: 'Manguera no encontrada'
            });
        };

        const hoseChanges = {
            statusId: "622eb1b7ea4a14a46dbc83bb",
        };

        const hoseDeleted = await Hoses.findByIdAndUpdate(hoseId, hoseChanges, { new: true });
        res.json({
            ok: true,
            msg: 'Eliminado',
            hose: hoseDeleted
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };

};

module.exports = {
    getHoses,
    getHoseIdByAssigmentHoseId,
    getFuelIdByHoseId,
    getHosesActive,
    createHose,
    updateHose,
    deleteHose,
    getRegularPrice,
    getSuperPrice,
    getDieselPrice

}
//