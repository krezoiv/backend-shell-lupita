

const { response } = require('express');
const LubricantInventory = require('../../models/lubricants/lubricantsInventory.models');

const readLubricantInventory = async (req, res = response) => {

    try {
        const lubricantInventory = await LubricantInventory.find({}, 'lubricantInvetoryCode lubricantId lubricantAvailable ')
            .populate({
                path: 'lubricantId'
            });

        res.json({
            ok: true,
            lubricantInventory: lubricantInventory
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
};

const createLubricantInventory = async (req, res = response) => {
    try {
        const lubricantInventory = new LubricantInventory(req.body);
        await lubricantInventory.save();
        res.json({
            ok: true,
            msg: lubricantInventory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

const saleLubricantInventory = async (req, res = response) => {
    
    const inventoryCode = String
    const {lubricantInvetoryCode} = req.body;

    const id = '63922a92097f57bb058784f7'
    try {
        const codigo = await LubricantInventory.findOne(lubricantId)
       
        res.json({
            ok: true,
            codigo
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

    /*const {lubricantId , lubricantAvailable, amount } = req.body;
    try {
        const salesLubricante = await LubricantInventory.updateOne({
            "lubricantId" : lubricantId
        }, {
            $set: {
                "lubricantAvailable" : amount
            }
        }, {
            multi: false
        });

        res.json({
            ok: true,
            salesLubricante
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }*/
}

module.exports = {
    readLubricantInventory,
    createLubricantInventory,
    saleLubricantInventory
}