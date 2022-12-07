/**
 * controllers for islands
 */
 const { response } = require('express');
const Island = require('../../models/fuel-station/islands.model');


//gets all islands
const getIsland = async (req, res = response) => {

    try {
        const island = await Island.find({}, 'islandNumber statusId')
            .populate({
                path: "statusId", select: 'statusName'
            });

        res.json({
            ok: true,
            island
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
};

//gets all active islands
const getIslandActive = async (req, res = response) => {

    try {
        const island = await Island.find({statusId: '633f0e5bdcc030846c271119'}, 'islandNumber statusId')
            .populate({
                path: "statusId", select: 'statusName'
            });

        res.json({
            ok: true,
            island
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
};



//create new island
const createIsland = async (req, res = response) => {

    try {
        const island = new Island(req.body);
        await island.save();

        res.json({
            ok: true,
            msg: island
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//updates islands
const updateIsland = async(req, res = response ) => {
    
    const islandId = req.params.id;
 

    try {

        const island = await Island.findById(islandId);
     
       
        if(!island){
            return res.status(400).json({
                ok: false,
                msg: 'Isla no encontrada'
            });
        };


        const islandChange = {
            ...req.body
        }

        const islandUpdated = await Island.findByIdAndUpdate(islandId, islandChange, { new : true});
        res.json({
            ok: true,
            island: islandUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });
    };
};


//delets islands
const deleteIsland = async(req, res = response) => {

    const islandId = req. params.id;

    try {
        const island = await Island.findById(islandId);
        if(!island){
            return res.json({
                ok: false,
                msg : 'Isla no encontrada'
            });
        };

        const IslandChanges = {
            statusId : "633f0e55dcc030846c271117",
        };

        const islandDeleted = await Island.findByIdAndUpdate(islandId, IslandChanges, { new : true});
        res.json({
            ok: true,
            msg: 'Eliminado',
            fuel : islandDeleted
        });
    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

module.exports ={
    getIsland,
    createIsland,
    updateIsland,
    deleteIsland,
    getIslandActive
}