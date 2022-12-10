

const { response } = require('express');
const Lubricants = require('../../models/lubricants/lubricants.models');

const getLubricants = async (req, res = response) => {

    try {
        const lubricants = await Lubricants.find({})
            .populate('statusId', 'statusName');

        res.json({
            ok: true,
            lubricants
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const createLubricants = async (req, res = response) => {

    try {
        const lubricants = new Lubricants(req.body);
        await lubricants.save();

        res.json({
            ok: true,
            msg: lubricants
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const updateLubricants = async (req, res = response) => {

    const lubricantId = req.params.id;
    try {

        const lubricants = await Lubricants.findById(lubricantId);
        if(!lubricants){
            return res.status(400).json({
                ok: false,
                msg: 'Lubricante no encontrado'
            });
        };

        const lubricantChanges = {
            ...req.body
        };

        const lubricantUpdate = await  Lubricants.findByIdAndUpdate(lubricantId, lubricantChanges, {new: true});
        res.json({
            ok: true,
            lubricantUpdate: lubricantUpdate,
           
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });
    }
}


module.exports = {
    getLubricants,
    createLubricants,
    updateLubricants
    
}

