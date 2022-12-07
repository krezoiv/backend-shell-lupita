/**
 * controllers for purchase order
 */

const { response } = require('express');
const PurchaseOrder = require('../../models/purchases/PurchaseOrders.model');
const FuelInventory = require('../../models/fuel-station/fuelInventory.models');
const DetailPurchaseOrder = require ('../../models/purchases/detailPurchaseOrder.model')
const Purchases = require('../../models/purchases/purchases.model')

//create new purchase order
const createPurchaseOrder = async (req, res = response) => {

    try {
        const { orderNumber } = req.body;
        const orderNo = await PurchaseOrder.findOne({ "orderNumber": orderNumber });
        if (orderNo) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe registrado un numero de orden con ese identificador'
            });
        };

        const purchaseOrder = new PurchaseOrder(req.body);
        await purchaseOrder.save();
        res.json({
            ok: true,
            msg: purchaseOrder
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

}


//get a purchase order
const getPurchaseOrder = async (req, res = response) => {
    try {
        const { orderNumber } = req.body;
        const purchaseOrder = await PurchaseOrder.findOne({ orderNumber: orderNumber }, 'purchaseOrder');
        res.json({
            ok: true,
            purchaseOrder
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get purchase order id by order number
const getPurchaseOrderId = async (req, res = response) => {
    try {
        const { orderNumber } = req.body;
        const purchaseOrderId = await PurchaseOrder.findOne({ orderNumber: orderNumber }, 'purchaseOrderId');
        res.json({
            ok: true,
            purchaseOrderId
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}


//gets totoal purchase order
const getTotalPurchase = async (req, res = response) => {
    try {
        const { orderNumber } = req.body;

        const totalPurchase = await PurchaseOrder.findOne({ orderNumber: orderNumber }, 'totalPurchaseOrder');
        res.json({
            ok: true,
            totalPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//updates total purchases order
const updateTotalPurchaseOrder = async (req, res = response) => {

    const purchaseOrderId = req.params.id;
    try {
        const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);
        if (!purchaseOrder) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro informacíon'
            });
        };

        const changes = {
            ...req.body
        }

        const purchaseOderChange = await PurchaseOrder.findByIdAndUpdate(purchaseOrderId, changes, { new: true });
        res.json({
            ok: true,
            purchaseOderChange
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const updateIdPurchase = async (req, res = response) => {


    try {



        const { orderNumber, purchaseId } = req.body;

        const purchaseOderChange = await PurchaseOrder.updateOne(
            {
                orderNumber: orderNumber
            },
            {
                $set: {
                    purchaseId: purchaseId
                }
            },
            {
                multi: false
            }
        );
        res.json({
            ok: true,
            purchaseOderChange
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets information from purchase order

const getInfoPurchaseOrder = async (req, res = response) => {
    try {
        const { orderNumber } = req.body;
        const infoPurchaseOrder = await PurchaseOrder.findOne({ orderNumber: orderNumber })
            .populate('storeId', 'storeName')
            .populate('vehicleId', 'vehicleName')
            .populate('purchaseId');
        res.json({
            ok: true,
            infoPurchaseOrder
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//gert totals purchase order from ordernumber
const getTotalPurchaseOrder = async (req, res = response) => {

    const { purchaseId } = req.body;
    try {
        const totalPurchase = async = await Purchase.findOne({
            "orderNumer": orderNumer
        }, 'totaPurchase')
        res.json({
            ok: true,
            totalPurchase
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const lastPurchaseOrder = async (req, res = response) => {

    const id = String
    try {

        const pchsOrdId = await PurchaseOrder.findOne({},
            'purchaseOrderId orderNumber').sort({
                $natural: -1
            }).limit(1);
        
        this.id = pchsOrdId;

        const lastPurchaseOrder = await PurchaseOrder.find({
         
        }).populate({ path: 'purchaseId' }).sort({
            $natural: -1
        }).limit(1);

        res.json({
            ok: true,
            lastPurchaseOrder,
            pchsOrdId,
          

        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

const deletePurchaseOrder  = async (req, res = response) => {
    const regularAmount = Number
    const superAmount = Number
    const dieselAmount = Number
    const superAmountPendingInventory = Number
    const regularAmountPendingInventory = Number
    const dieselAmountPendingInventory = Number
    const inventoryCodeSuper = 't-s1'
    const inventoryCodeRegular = 't-r1'
    const inventoryCodeDiesel = 't-d1'
    const AmountPendingRegular = Number
    const AmountPendingSuper = Number
    const AmountPendingDiesel = Number
    const idFuelSuper = String
    const idFuelRegular = String
    const idFuelDiesel = String
    const {orderNumber, purchaseOrderId } = req.body;

    try {
        
        const existId = await Purchases.findOne({purchaseOrderId});
        if(existId){
            return res.status(400).json({
                ok: false,
                msg: " ¡¡Existe factura de compra registrada para este No. Orden, para eliminar No. de Ordern debe eliminar factura de compra!!"
            });
        }


        const inventoryIdFuelSuper = await FuelInventory.findOne({ inventoryCode: inventoryCodeSuper }, 'fuelId'); //obitiene el Id fuel super
        this.idFuelSuper = inventoryIdFuelSuper.fuelId //asignacion del id super a la variable 
        const findAmountSuper = await PurchaseOrder.findOne({'orderNumber' : orderNumber}, 'totalGallonSuper')// busqueda del monto del detalle super
        this.superAmount = findAmountSuper.totalGallonSuper;
        const findAmountPendingInventorySuper = await FuelInventory.findOne({'fuelId': this.idFuelSuper }, 'amountPending')// busqueda del monto apending del detalle
        this.superAmountPendingInventory = findAmountPendingInventorySuper.amountPending
        this.AmountPendingSuper = this.superAmountPendingInventory - this.superAmount

        const updateAMountPendingSuper = await FuelInventory.updateOne({
            "fuelId": this.idFuelSuper
        }, {
            $set: {
                "amountPending":  this.AmountPendingSuper
            }
        }, {
            multi: false
        }
        )


   
        const inventoryIdFuelRegular = await FuelInventory.findOne({ inventoryCode: inventoryCodeRegular }, 'fuelId'); //obitiene el Id fuel regular
        this.idFuelRegular = inventoryIdFuelRegular.fuelId //asignacion del id regular a la variable 
        const findAmountRegular = await PurchaseOrder.findOne({'orderNumber' : orderNumber}, 'totalGallonRegular')// busqueda del monto del detalle regular
        this.regularAmount = findAmountRegular.totalGallonRegular;
        const findAmountPendingInventoryRegular = await FuelInventory.findOne({'fuelId': this.idFuelRegular }, 'amountPending')// busqueda del monto apending del detalle
        this.regularAmountPendingInventory = findAmountPendingInventoryRegular.amountPending
        this.AmountPendingRegular = this.regularAmountPendingInventory - this.regularAmount

        const updateAmountPendingRegular = await FuelInventory.updateOne({
            "fuelId": this.idFuelRegular
        }, {
            $set: {
                "amountPending": this.AmountPendingRegular
            }
        }, {
            multi: false
        }
        )


        const inventoryIdFuelDiesel = await FuelInventory.findOne({ inventoryCode: inventoryCodeDiesel }, 'fuelId'); //obitiene el Id fuel diesel
        this.idFuelDiesel = inventoryIdFuelDiesel.fuelId //asignacion del id diesel a la variable 
        const findAmountDiesel = await PurchaseOrder.findOne({'orderNumber' : orderNumber}, 'totalGallonDiesel')// busqueda del monto del detalle diesel
        this.dieselAmount = findAmountDiesel.totalGallonDiesel;
        const findAmountPendingInventoryDiesel = await FuelInventory.findOne({'fuelId': this.idFuelDiesel }, 'amountPending')// busqueda del monto apending del detalle
        this.dieselAmountPendingInventory = findAmountPendingInventoryDiesel.amountPending
        this.AmountPendingDiesel = this.dieselAmountPendingInventory - this.dieselAmount


        const updateAmountPendingDiesel = await FuelInventory.updateOne({
            "fuelId": this.idFuelDiesel
        }, {
            $set: {
                "amountPending": this.AmountPendingDiesel
            }
        }, {
            multi: false
        }
        )

        const deletePurchaseOrderDetail = await DetailPurchaseOrder.deleteMany({purchaseOrderId : purchaseOrderId});
        const deletePurchaseOrder = await PurchaseOrder.findOneAndDelete({orderNumber: orderNumber});
      
        res.json({
            ok: true,
            inventoryIdFuelSuper,
            findAmountSuper,
            findAmountPendingInventorySuper,
            inventoryIdFuelRegular,
            findAmountRegular,
            findAmountPendingInventoryRegular,
            inventoryIdFuelDiesel,
            findAmountDiesel,
            findAmountPendingInventoryDiesel,
            updateAMountPendingSuper,
            updateAmountPendingRegular,
            updateAmountPendingDiesel,
            deletePurchaseOrderDetail,
            deletePurchaseOrder
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
    createPurchaseOrder,
    getPurchaseOrder,
    updateTotalPurchaseOrder,
    getTotalPurchase,
    getInfoPurchaseOrder,
    getPurchaseOrderId,
    updateIdPurchase,
    lastPurchaseOrder,
    deletePurchaseOrder


}