/**
 * controllores for details of purchases
 */

const { response } = require('express');
const DetailPurchaseOrder = require('../../models/purchases/detailPurchaseOrder.model');


//it creats a new deteail purchase
const createDetailPurchaseOrder = async (req, res = response) => {
    try {
        const detailPurchaseOrder = new DetailPurchaseOrder(req.body);
        await detailPurchaseOrder.save();
        res.json({
            ok: true,
            msg: detailPurchaseOrder
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get list of details
const getListDetailPurchaseOrder = async (req, res = response) => {
    const { purchaseOrderId } = req.body;
    try {
        const listPurchaseOrder = await DetailPurchaseOrder.find({
            "purchaseOrderId": purchaseOrderId
        })
            .populate({
                path: "fuelId"
            });

        res.json({
            ok: true,
            listPurchaseOrder
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get totals amounts a details purchases
const gettotalDetailPurchaseOrder = async (req, res = response) => {

    try {
        const totalDetailPurchaseOrder = await DetailPurchaseOrder.aggregate([{ $match: { aplicado: false } }, {
            $group: {
                _id: "",
                count: { $sum: "$total" }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            totalDetailPurchaseOrder
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get total idps of purchases
const gettotalIDPDetailPurchaseOrder = async (req, res = response) => {

    try {
        const totalDetailIDPPurchaseOrder = await DetailPurchaseOrder.aggregate([{ $match: { aplicado: false } }, {
            $group: {
                _id: "",
                count: { $sum: "$idpTotal" }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            totalDetailIDPPurchaseOrder
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//update purchese order 
const updateAplicarDetailPurchaseOrder = async (req, res = response) => {
    try {
        const aplicarDetailOrder = await DetailPurchaseOrder.updateMany({ "aplicado": false }, { $set: { aplicado: true } });

        res.json({
            ok: true,
            aplicarDetailOrder
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//gerts purchase information by purchase orderid
const getDetailPurchaseOderInfo = async (req, res = response) => {
    try {
        const { purchaseOrderId } = req.body;
        const detailPurchaseOderInfo = await DetailPurchaseOrder.find({ purchaseOrderId: purchaseOrderId }, 'purchaseOrderId  amount fuelId idpTotal total')
            .populate({ path: 'purchaseOrderId' })
            .populate( 'fuelId' )
        res.json({
            ok: true,
            detailPurchaseOderInfo
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

/***
 * * Method to get amount of fuels purchase to
 * *update fuel inventory
 */
const getAmountFuelPurchase = async (req, res = response) => {
    const { fuelId, purchaseOrderId } = req.body;
    try {
        const amountFuel = await DetailPurchaseOrder.findOne({
            $and: [{ "fuelId": fuelId }, { "purchaseOrderId": purchaseOrderId }]
        }, 'amount ');
        res.json({
            ok: true,
            amountFuel: amountFuel
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

///get amounts fuel regular
const getAmountFuelPurchaseRegular = async (req, res = response) => {
    const { fuelId, purchaseOrderId } = req.body;
    try {
        const amountFuelRegular = await DetailPurchaseOrder.findOne({
            $and: [{ "fuelId": fuelId }, { "purchaseOrderId": purchaseOrderId }]
        }, 'amount ');
        res.json({
            ok: true,
            amountFuelRegular
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//get amounts fuel super
const getAmountFuelPurchaseSuper = async (req, res = response) => {
    const { fuelId, purchaseOrderId } = req.body;
    try {
        const amountFuelSuper = await DetailPurchaseOrder.findOne({
            $and: [{ "fuelId": fuelId }, { "purchaseOrderId": purchaseOrderId }]
        }, 'amount ');
        res.json({
            ok: true,
            amountFuelSuper
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//get amounts fuel diesel
const getAmountFuelPurchaseDiesel = async (req, res = response) => {
    const { fuelId, purchaseOrderId } = req.body;
    try {
        const amountFuelDiesel = await DetailPurchaseOrder.findOne({
            $and: [{ "fuelId": fuelId }, { "purchaseOrderId": purchaseOrderId }]
        }, 'amount ');
        res.json({
            ok: true,
            amountFuelDiesel
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
    createDetailPurchaseOrder,
    getListDetailPurchaseOrder,
    gettotalDetailPurchaseOrder,
    updateAplicarDetailPurchaseOrder,
    getDetailPurchaseOderInfo,
    gettotalIDPDetailPurchaseOrder,
    getAmountFuelPurchase,
    getAmountFuelPurchaseDiesel,
    getAmountFuelPurchaseRegular,
    getAmountFuelPurchaseSuper

}