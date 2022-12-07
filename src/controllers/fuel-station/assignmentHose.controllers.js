/**
 * controller to get the pump hose assignment number,
 * It will serve to find the corresponding hose and side of the pump to
 * daily pump numbering assignment
 * controlador para obtner el numero de asignacion de manguera de la bomba,
 * servira para buscar la manguera y lado correspondiente de la bomba para
 * asignacion de la numeracion de bombas diarias   
*/



const { response } = require('express');


const AssignmentHose = require('../../models/fuel-station/assignmentHose.model');

const getAssignmentHose = async (req, res = response) => {
    try {
        const { assignmentId } = req.body;
        const assignmentHose = await AssignmentHose.find({ assignmentId: assignmentId }, 'hoseId position sideId assignmentId statusId')
            .populate({
                path: 'statusId'
            })
            .populate({
                path: 'hoseId',
                populate: { path: 'fuelId', select: 'fuelId' }
            })
            .populate({
                path: 'sideId'
            })
            .populate({
                path: 'assignmentId',
                populate: {
                    path: 'dispenserId'
                }
            })

        res.json({
            ok: true,
            assignmentHose
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

const createAssignmentHose = async (req, res = response) => {
    try {
        const assignmentHose = new AssignmentHose(req.body);
        await assignmentHose.save();
        res.json({
            ok: true,
            msg: assignmentHose
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

const getAssignmentHoseId = async (req, res = response) => {

    try {
        const { position, sideId, assignmentId } = req.body;
        const assignmenHose = await AssignmentHose.findOne({ $and: [{ position: position }, { sideId: sideId }, { assignmentId: assignmentId }] }, 'assignmentHoseId hoseId assignmentId sideId')
            .populate({
                path: 'hoseId',
                populate: { path: 'fuelId', select: 'fuelName' }
            })
            .populate({
                path: 'assignmentId',
                populate: {
                    path: 'dispenserId',
                    populate: { path: 'islandId', select: 'islandNumber' }
                }
            })
            .populate({
                path: 'sideId'
            })
        res.json({
            ok: true,
            assignmenHose
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({  
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    }
}


module.exports = {
    createAssignmentHose,
    getAssignmentHose,
    getAssignmentHoseId
}