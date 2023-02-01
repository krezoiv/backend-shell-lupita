
const { response } = require('express');
const Taxes = require('../../models/accounting/taxes.models');


/**
 *?creates the fuel idp tax
 *?crea el impuesto idp de combustible
 */
const createTaxes = async (req, res = response) => {
  
    try {
        const taxes = new Taxes(req.body);
        await taxes.save();
        res.json({
            ok: true,
            msg: taxes
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
        
    }

};

const getTaxes = async(req, res = response) => {
    try {
        const taxes = await Taxes.find({}, 'taxesId idpName idpAmount');
        res.json({
            ok: true,
            taxes
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

module.exports = {
    createTaxes,
    getTaxes
}

//01.02.23

