
/** 
 *?controller for hose assignments
 *?controlador para las asignaciones de mangueras 
 */
const { response } = require('express');
const Assignment = require('../../models/fuel-station/assignmente.model');


const createAssignment = async (req, res = response) => {
    try {

        const { dispenserId } = req.body;
        const ass = await Assignment.findOne({ "dispenserId": dispenserId })
        if (ass) {
            return res.status(400).json({
                ok: false,
                msg: 'Existe Asignaciones para esta bomba'
            });
        };

        const assignment = new Assignment(req.body);
        await assignment.save();
        res.json({
            ok: true,
            msg: assignment
        });

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    }
}

/**
 * get id assgnment
 * obtiente el id de la asigbnacion

 */
const getidAssignment = async (req, res = response) => {

    try {
        const { dispenserId } = req.body;
        const idAssignments = await Assignment.findOne({ dispenserId: dispenserId }, 'assignmentId')
                
          

        res.json({
            ok: true,
            idAssignments
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

}

/**
 * get assignments
 * obtiene las asignaciones 
 */
const getAssignment = async (req, res = response) => {

    const { dispenserId } = req.params.id;
    const idAssignments = await Assignment.findById(dispenserId)
        .populate('dispenserId')

    res.json({
        ok: true,
        msg: 'encontrado',
        idAssignments
    });

}



module.exports = {
    createAssignment,
    getidAssignment,
    getAssignment
}