

const { response } = require('express');
const LubricantInventory = require('../../models/lubricants/lubricantsInventory.models');

const readLubricantInventory = async (req, res = response) => {

    try {
        const lubricantInventory = await LubricantInventory.find({}, 'lubricantInvetoryCode lubricantId lubricantAvailable ')
        .populate({
            path: 'lubricantId'
        })
      

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

//rebajar inventario desde una venta, busqueda por codigo de inventario
const saleLubricantInventory = async (req, res = response) => {

    const available = Number;
    const newAvailable = Number;
    const { lubricantInvetoryCode, amount } = req.body;


    try {
        const totalInventory = await LubricantInventory.findOne({ "lubricantInvetoryCode": lubricantInvetoryCode })
        this.available = totalInventory.lubricantAvailable


        if(this.available < amount ){
            return res.status(400).json({
                ok: false,
                msg: 'Inventario insuficiente'
            });
        }

        this.newAvailable = this.available - amount
  
        const salesLubricante = await LubricantInventory.updateOne({
            "lubricantInvetoryCode": lubricantInvetoryCode
        }, {
            $set: {
                "lubricantAvailable": this.newAvailable
            }
        }, {
            multi: false
        })
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