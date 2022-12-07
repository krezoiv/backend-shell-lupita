

const { response } = require('express');
const Purchase = require('../../models/purchases/purchases.model');
const PurchaseOrders = require('../../models/purchases/PurchaseOrders.model')
const DetailPurchaseOrder = require('../../models/purchases/detailPurchaseOrder.model');
const FuelInventory = require('../../models/fuel-station/fuelInventory.models');


//creates a new purchase
const createPurchase = async (req, res = response) => {
    
        const  {orderNumber} = req.body;
    try {

        const existOrderNumber = await Purchase.findOne({orderNumber});
        if(existOrderNumber){
            return res.status(400).json({
                ok: false,
                msg: "Ya existe factura registrada para este No. Orden"
            });
        }
        
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.json({
            ok: true,
            msg: purchase
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//to get id of purchase searching by order number
const getPurchaseId = async (req, res = response) => {
    const { orderNumber } = req.body;
    try {
        const getIdPurchase = await Purchase.findOne({
            orderNumber: orderNumber
        }, 'purchaseId')

        res.json({
            ok: true,
            getIdPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

}

//get purchases by range dates
const getPurchaseByDates = async (req, res = response) => {
    const { initialDate, finalDate, from } = req.body;
    try {
        const [getData, total] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId ')
                .populate('purchaseId').skip(from)
                .limit(5).sort({ deliveryDate: -1 }),

            Purchase.count()

        ]);

        res.json({
            ok: true,
            getData,
            total
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get purchases by searching with order number
const getPurchaseByNoOrder = async (req, res = response) => {
    try {
        const { orderNumber } = req.body;
        const order = await PurchaseOrders.findOne({ orderNumber: orderNumber }
            , 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
            .populate('purchaseId');
        if (!order) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró información'
            });
        }

        const purchaseByOrder = await PurchaseOrders.find({ orderNumber: orderNumber }
            , 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
            .populate('purchaseId');
        if (!purchaseByOrder) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe registrado un numero de orden con ese identificador'
            });
        };
        res.json({
            ok: true,
            purchaseByOrder
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

// sums purchase by range dates

const countTotalPurchaseByDate = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {
        const countTotalPurchase = await Purchase.aggregate([{
            $match: {
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalPurchase", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//sum total gallons regular by dates
const countTotalPurchaseRegularGallonsByDates = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {
        const countTotalPurchaseRegular = await PurchaseOrders.aggregate([{
            $match: {
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalGallonRegular", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalPurchaseRegular
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//sum total gallons super by dates
const countTotalPurchaseSuperGallonsByDates = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {
        const countTotalPurchaseSuper = await PurchaseOrders.aggregate([{
            $match: {
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalGallonSuper", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalPurchaseSuper
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//sum total gallons diesel by dates
const countTotalPurchaseDieselGallonsByDates = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {
        const countTotalPurchaseDiesel = await PurchaseOrders.aggregate([{
            $match: {
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalGallonDiesel", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalPurchaseDiesel
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get greater purchase by range dates
const getGreaterPurchase = async (req, res = reponse) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [greatePurchase] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId ')
                .populate('purchaseId').sort({ totalPurchaseOrder: -1 }).limit(1),

        ])

        res.json({
            ok: true,
            greatePurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get lesser purchase by range dates
const getLesserPurchase = async (req, res = reponse) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [lesserPurchase] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId ')
                .populate('purchaseId').sort({ totalPurchaseOrder: 1 }).limit(1),

        ])

        res.json({
            ok: true,
            lesserPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get greater regular  purchase by range dates
const getGreaterPurchaseRegular = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [greaterRegularPurchase] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
                .populate('purchaseId').sort({ totalGallonRegular: -1 }).limit(1),

        ])

        res.json({
            ok: true,
            greaterRegularPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get lesser regular  purchase by range dates
const getLesserPurchaseRegular = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [lesserRegularPurchase] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
                .populate('purchaseId').sort({ totalGallonRegular: 1 }).limit(1),

        ])

        res.json({
            ok: true,
            lesserRegularPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get greater super  purchase by range dates
const getGreaterPurchaseSuper = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [greaterSuperPurchase] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
                .populate('purchaseId').sort({ totalGallonSuper: -1 }).limit(1),

        ])

        res.json({
            ok: true,
            greaterSuperPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get lesser super  purchase by range dates
const getLesserPurchaseSuper = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [lesserSuperPurchase] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
                .populate('purchaseId').sort({ totalGallonSuper: 1 }).limit(1),

        ])

        res.json({
            ok: true,
            lesserSuperPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get greater diesel  purchase by range dates
const getGreaterPurchaseDiesel = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [greaterDieselPurchase] = await Promise.all([
            PurchaseOrdes.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
                .populate('purchaseId').sort({ totalGallonDiesel: -1 }).limit(1),

        ])

        res.json({
            ok: true,
            greaterDieselPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get lesser diesel  purchase by range dates
const getLesserPurchaseDiesel = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {

        const [lesserDieselPurchase] = await Promise.all([
            PurchaseOrders.find({
                "deliveryDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }, 'orderNumber deliveryDate totalPurchaseOrder totalIDPPurchaseOrder storeId vehicleId applied turn totalGallonRegular totalGallonSuper totalGallonDiesel purchaseId')
                .populate('purchaseId').sort({ totalGallonDiesel: 1 }).limit(1),

        ])

        res.json({
            ok: true,
            lesserDieselPurchase
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get purchases that are status pending//
const getPendingPurchases = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {

        const pendding = await Purchase.find( {$and : [
           { 'deliveryDate': { $gte: new Date(initialDate),
            $lte: new Date(finalDate)} }, { appliedId : 'pendiente'}
        ]}).populate('purchaseOrderId')

       
        res.json({
            ok: true,
            pendding
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
}


//delte purchase an updating values on inventory
const deletePurchase = async (req, res = response) => {

    const {purchaseOrderId, fuelId} =req.body;
    const superAmount = Number
    const superAmountInventory = Number
    const superAmountPendingInventory = Number
    const totalSuper = Number
    const inventoryCodeSuper = 't-s1'
    const idFuelSuper = String
    const superAmountPending = Number

    const regularAmount = Number
    const regularAmountInventory = Number
    const regularAmountPendingInventory = Number
    const totalRegular = Number
    const inventoryCodeRegular = 't-r1'
    const idFuelRegular = String
    const regularAmountPending = Number

    const dieselAmount = Number
    const dieselAmountInventory = Number
    const dieselAmountPendingInventory = Number
    const totalDiesel = Number
    const inventoryCodeDiesel = 't-d1'
    const idFuelDiesel = String
    const dieselAmountPending = Number


    try {
        
        const inventoryIdFuelSuper = await FuelInventory.findOne({ inventoryCode: inventoryCodeSuper }, 'fuelId'); //obitiene el Id fuel super
        this.idFuelSuper = inventoryIdFuelSuper.fuelId //asignacion del id super a la variable 
        const findAmountSuper = await DetailPurchaseOrder.findOne({$and : [{'fuelId': this.idFuelSuper}, {'purchaseOrderId' : purchaseOrderId}]}, 'amount')// busqueda del monto del detalle super
        const findAvailableInventorySuper = await FuelInventory.findOne({'fuelId': this.idFuelSuper}, 'available amountPending')// busqueda del monto apending del detalle
        
        this.superAmount= findAmountSuper.amount // asignacion del monto super al id
        this.superAmountInventory = findAvailableInventorySuper.available //asingacion de lo dispobible en el inventario
        this.superAmountPendingInventory = findAvailableInventorySuper.amountPending // asiganacion del monto pendiente a la variable
      
 
        this.totalSuper = this.superAmountInventory - this.superAmount  //sera el nuevo monto del inventario
        this.superAmountPending = this.superAmountPendingInventory + this.superAmount
        const updateAvailiableSuper = await FuelInventory.updateOne({
                "fuelId" : this.idFuelSuper},{
                $set:{
                    "available": this.totalSuper, "amountPending": this.superAmountPending}},{
                multi:false
            }
        )


        const inventoryIdFuelRegular = await FuelInventory.findOne({ inventoryCode: inventoryCodeRegular }, 'fuelId'); //obitiene el Id fuel regular
        this.idFuelRegular = inventoryIdFuelRegular.fuelId //asignacion del id super a la variable 
        const findAmountRegular = await DetailPurchaseOrder.findOne({$and : [{'fuelId': this.idFuelRegular}, {'purchaseOrderId' : purchaseOrderId}]}, 'amount')// busqueda del monto del detalle regular
        const findAvailableInventoryRegular = await FuelInventory.findOne({'fuelId': this.idFuelRegular}, 'available amountPending')// busqueda del monto apending del detalle
        this.regularAmount= findAmountRegular.amount // asignacion del monto super al id
        this.regularAmountInventory = findAvailableInventoryRegular.available //asingacion de lo dispobible en el inventario
        this.regularAmountPendingInventory = findAvailableInventoryRegular.amountPending // asiganacion del monto pendiente a la variable
        
        this.totalRegular = this.regularAmountInventory - this.regularAmount 
        this.regularAmountPending = this.regularAmountPendingInventory +this.regularAmount
        const updateAvailiableRegular = await FuelInventory.updateOne({
            "fuelId" : this.idFuelRegular},{
            $set:{
                "available": this.totalRegular,  "amountPending": this.regularAmountPending }},{
            multi:false
        }
    )


    const inventoryIdFuelDiesel = await FuelInventory.findOne({ inventoryCode: inventoryCodeDiesel }, 'fuelId'); //obitiene el Id fuel regular
    this.idFuelDiesel = inventoryIdFuelDiesel.fuelId //asignacion del id super a la variable 
    const findAmountDiesel = await DetailPurchaseOrder.findOne({$and : [{'fuelId': this.idFuelDiesel}, {'purchaseOrderId' : purchaseOrderId}]}, 'amount')// busqueda del monto del detalle regular
    const findAvailableInventoryDiesel = await FuelInventory.findOne({'fuelId': this.idFuelDiesel}, 'available amountPending')// busqueda del monto apending del detalle
    this.dieselAmount= findAmountDiesel.amount // asignacion del monto super al id
    this.dieselAmountInventory = findAvailableInventoryDiesel.available //asingacion de lo dispobible en el inventario
    this.dieselAmountPendingInventory = findAvailableInventoryDiesel.amountPending // asiganacion del monto pendiente a la variable
    
    this.totalDiesel = this.dieselAmountInventory - this.dieselAmount
    this.dieselAmountPending = this.dieselAmountPendingInventory +this.dieselAmount
    const updateAvailiableDiesel = await FuelInventory.updateOne({
        "fuelId" : this.idFuelDiesel},{
        $set:{
            "available": this.totalDiesel,  "amountPending": this.dieselAmountPending}},{
        multi:false
    }
)


const deletePurchase = await Purchase.findOneAndDelete({purchaseOrderId : purchaseOrderId})
        res.json({
            ok: true,
            
            updateAvailiableSuper,
            updateAvailiableRegular,
            updateAvailiableDiesel,
            deletePurchase
          
          
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//aplied purchase to stutus paid
const appliedPurchase = async (req, res = response) => {
try {
    const {orderNumber, bankId, NoBankCheck, checkAmount, otherPayment, otherPaymentDescription, couponsAmount} = req.body;
    const updatePurchase = await Purchase.updateOne({
        "orderNumber" : orderNumber
    }, {
        $set :{
            "appliedId" : "pagada", "bankId": bankId, "NoBankCheck": NoBankCheck, "checkAmount": checkAmount, "otherPayment" : otherPayment, "otherPaymentDescription": otherPaymentDescription, "couponsAmount" : couponsAmount
        }
    },{multi: false})
    

    res.json({
        ok: true,
        
        updatePurchase,
       
      
      
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
    createPurchase,
    getPurchaseByDates,
    getPurchaseByNoOrder,
    countTotalPurchaseByDate,
    countTotalPurchaseRegularGallonsByDates,
    countTotalPurchaseSuperGallonsByDates,
    countTotalPurchaseDieselGallonsByDates,
    getGreaterPurchase,
    getLesserPurchase,
    getGreaterPurchaseRegular,
    getLesserPurchaseRegular,
    getGreaterPurchaseSuper,
    getLesserPurchaseSuper,
    getGreaterPurchaseDiesel,
    getLesserPurchaseDiesel,
    getPurchaseId,
    deletePurchase,
    getPendingPurchases,
    appliedPurchase
}