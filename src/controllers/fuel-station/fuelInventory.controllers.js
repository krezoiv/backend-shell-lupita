/**
 * * Inventory Controller
 * * controlador para iventarios
 */

const { response } = require('express');
const FuelInventory = require('../../models/fuel-station/fuelInventory.models');
const GeneralDispenserReader = require('../../models/fuel-station/generalDispenserReader.models');
const PurchaseOrder = require('../../models/purchases/PurchaseOrders.model')

//create a new product on iventoty
const createFuelInventory = async (req, res = response) => {
    try {
        const fuelInventory = new FuelInventory(req.body);
        await fuelInventory.save();

        res.json({
            ok: true,
            msg: fuelInventory
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

// get list of all products on inventory
const readInventory = async (req, res = response) => {
    try {
        const fuelInventory = await FuelInventory.find({}, 'inventoryCode fuelTankId fuelId available amountPending')
            .populate({
                path: 'fuelTankId', select: 'tankName maxStorage'
            })
            .populate({
                path: 'fuelId', select: 'costPrice salePrice fuelName'
            })
            .populate({
                path: 'fuelId',
                populate: { path: 'taxesId' }
            });
        res.json({
            ok: true,
            fuelInventory: fuelInventory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get id producto on inventory
const getFuelInventoryId = async (req, res = response) => {
    try {
        const { fuelId } = req.body;
        const fuelInventoryId = await FuelInventory.findOne({ fuelId: fuelId }, 'fuelInventoryId');
        res.json({
            ok: true,
            fuelInventoryId: fuelInventoryId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

// get amount pending on product inventory
const getFuelInventoryAmountPending = async (req, res = response) => {
    try {
        const { fuelId } = req.body;
        const fuelInventoryAmountPending = await FuelInventory.findOne({ fuelId: fuelId }, 'amountPending');
        res.json({
            ok: true,
            fuelInventoryAmountPending: fuelInventoryAmountPending
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get product code on inventory
const getFuelInventoryCode = async (req, res = response) => {
    try {
        const { fuelId } = req.body;
        const inventoryCode = await FuelInventory.findOne({ fuelId: fuelId }, 'inventoryCode');
        res.json({
            ok: true,
            inventoryCode: inventoryCode
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//ge ids regular on inventory
const getFuelIdRegular = async (req, res = response) => {
    try {
        const { inventoryCode } = req.body;
        const fuelIdRegular = await FuelInventory.findOne({ inventoryCode: "t-r1" }, 'fuelId');
        res.json({
            ok: true,
            fuelIdRegular: fuelIdRegular
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get ids super on inventory
const getFuelIdSuper = async (req, res = response) => {
    try {
        const { inventoryCode } = req.body;
        const fuelIdRegular = await FuelInventory.findOne({ inventoryCode: "t-s1" }, 'fuelId');
        res.json({
            ok: true,
            fuelIdSuper: fuelIdRegular
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//ge ids diesel on inventory
const getFuelIdDiesel = async (req, res = response) => {
    try {
        const { inventoryCode } = req.body;
        const fuelIdRegular = await FuelInventory.findOne({ inventoryCode: "t-d1" }, 'fuelId');
        res.json({
            ok: true,
            fuelIdDiesel: fuelIdRegular
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//gt fuel id  regular searching by inventory code
const getFuelRegularByCode = async (req, res = response) => {
    try {
        const { inventoryCode } = req.body;
        const fuelIdRegular = await FuelInventory.find({ inventoryCode: "t-r1" }, 'fuelId')
            .populate('fuelId');
        res.json({
            ok: true,
            fuelIdRegular
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gt fuel id  super searching by inventory code
const getFuelSuperByCode = async (req, res = response) => {
    try {
        const { inventoryCode } = req.body;
        const fuelIdSuper = await FuelInventory.find({ inventoryCode: "t-s1" }, 'fuelId')
            .populate('fuelId');
        res.json({
            ok: true,
            fuelIdSuper
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gt fuel id  diesel searching by inventory code
const getFuelDieselBycode = async (req, res = response) => {
    try {
        const { inventoryCode } = req.body;
        const fuelIdRegular = await FuelInventory.find({ inventoryCode: "t-d1" }, 'fuelId')
            .populate('fuelId');;
        res.json({
            ok: true,
            fuelIdDiesel: fuelIdRegular
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get amount available of products on invetory
const getFuelInventoryAvailable = async (req, res = response) => {
    try {
        const { fuelId } = req.body;
        const fuelInventoryAvailable = await FuelInventory.findOne({ fuelId: fuelId }, 'available');
        res.json({
            ok: true,
            fuelInventoryAvailable: fuelInventoryAvailable
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//get amount available of products on invetory using inventory code to search
const getFuelInventoryAvailablebyCode = async (req, res = response) => {
    try {
        const { inventoryCode } = req.body;
        const fuelInventoryAvailable = await FuelInventory.findOne({ inventoryCode: inventoryCode }, 'available');
        res.json({
            ok: true,
            fuelInventoryAvailable: fuelInventoryAvailable
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//update aomunt pendinn on inventory
const updateAmountPending = async (req, res = response) => {

    const fuelInventoryId = req.params.id;
    const { amountPending } = req.body
    try {
        const inventoryId = await FuelInventory.findOne({ "fuelInventoryId": fuelInventoryId });
        if (!inventoryId) {
            return res.status(400).json({
                ok: true,
                msg: 'Combustible en inventario no encontrado'
            });
        };

        const amountPendingChange = {
            amountPending
        };

        const amountPendingUpdated = await FuelInventory.findByIdAndUpdate(fuelInventoryId, amountPendingChange, { new: true });
        res.json({
            ok: true,
            amountPendingUpdated
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

}


//updates available amount when have a sale
const updateAvailableGallonsSale = async (req, res = response) => {


    const { readingDate } = req.body
    const idGeneralDispenser = Number
    const mechanicRegular = Number
    const availableRegular = Number
    const newAvRegular = Number
    const mechanicSuper = Number
    const availableSuper = Number
    const newAvSuper = Number
    const mechanicDiesel = Number
    const availableDiesel = Number
    const newAvDiesel = Number


    try {

        const idGeneral = await GeneralDispenserReader.findOne({ readingDate: readingDate }, 'generalDispenserReaderId')
        this.idGeneralDispenser = idGeneral

        const totalMecRegular = await GeneralDispenserReader.findOne({ readingDate: readingDate }, 'totalMechanicRegular');
        this.mechanicRegular = totalMecRegular.totalMechanicRegular

        const totalMecSuper = await GeneralDispenserReader.findOne({ readingDate: readingDate }, 'totalMechanicSuper');
        this.mechanicSuper = totalMecSuper.totalMechanicSuper

        const totalMecDiesel = await GeneralDispenserReader.findOne({ readingDate: readingDate }, 'totalMechanicDiesel');
        this.mechanicDiesel = totalMecDiesel.totalMechanicDiesel

        const avRegular = await FuelInventory.findOne({ "inventoryCode": "t-r1" }, "available");
        this.availableRegular = avRegular.available

        const avSuper = await FuelInventory.findOne({ "inventoryCode": "t-s1" }, "available");
        this.availableSuper = avSuper.available

        const avDiesel = await FuelInventory.findOne({ "inventoryCode": "t-d1" }, "available");
        this.availableDiesel = avDiesel.available

        this.newAvRegular = this.availableRegular - this.mechanicRegular
        this.newAvSuper = this.availableSuper - this.mechanicSuper
        this.newAvDiesel = this.availableDiesel - this.mechanicDiesel

        const availableRegularUpdated = await FuelInventory.updateOne({ "inventoryCode": "t-r1" }, {
            $set: { "available": this.newAvRegular }
        }, {
            multi: false
        });

        const availableSuperUpdated = await FuelInventory.updateOne({ "inventoryCode": "t-s1" }, {
            $set: { "available": this.newAvSuper }
        }, {
            multi: false
        });

        const availableDieselUpdated = await FuelInventory.updateOne({ "inventoryCode": "t-d1" }, {
            $set: { "available": this.newAvDiesel }
        }, {
            multi: false
        });

        res.json({
            ok: true,
            idGeneral,
            availableRegularUpdated,
            availableSuperUpdated,
            availableDieselUpdated

        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

};


/**
 ** uppdate set available + amountPending gallons
 */
const updateAvailableGallonsPurchase = async (req, res = response) => {

    const { orderNumber,purchaseOrderId } = req.body;
    const totalRegular = Number
    const regularPending = Number
    const availableRegular = Number
    const newAvRegular = Number
    const newRegularPending = Number
    const totalSuper = Number
    const superPending = Number
    const availableSuper = Number
    const newAvSuper = Number
    const newSuperPending = Number
    const totalDiesel = Number
    const dieselPending = Number
    const availableDiesel = Number
    const newAvDiesel = Number
    const newDieselPending = Number

    try {


        const tGallonRegular = await PurchaseOrder.findOne({ 'orderNumber': orderNumber }, 'totalGallonRegular');
        this.totalRegular = tGallonRegular.totalGallonRegular

        const totalGallonSuper = await PurchaseOrder.findOne({ 'orderNumber': orderNumber }, 'totalGallonSuper');
        this.totalSuper = totalGallonSuper.totalGallonSuper

        const totalGallonDiesel = await PurchaseOrder.findOne({ 'orderNumber': orderNumber }, 'totalGallonDiesel');
        this.totalDiesel = totalGallonDiesel.totalGallonDiesel

        const avRegular = await FuelInventory.findOne({ "inventoryCode": "t-r1" }, "available");
        this.availableRegular = avRegular.available

        const avSuper = await FuelInventory.findOne({ "inventoryCode": "t-s1" }, "available");
        this.availableSuper = avSuper.available

        const avDiesel = await FuelInventory.findOne({ "inventoryCode": "t-d1" }, "available");
        this.availableDiesel = avDiesel.available

        const pendRegular = await FuelInventory.findOne({ "inventoryCode": "t-r1" }, "amountPending");
        this.regularPending = pendRegular.amountPending

        const pendSuper = await FuelInventory.findOne({ "inventoryCode": "t-s1" }, "amountPending");
        this.superPending = pendSuper.amountPending

        const pendDiesel = await FuelInventory.findOne({ "inventoryCode": "t-d1" }, "amountPending");
        this.dieselPending = pendDiesel.amountPending


        this.newAvRegular = this.availableRegular + this.totalRegular
        this.newAvSuper = this.availableSuper + this.totalSuper
        this.newAvDiesel = this.availableDiesel + this.totalDiesel

        this.newRegularPending = this.regularPending - this.totalRegular
        this.newSuperPending = this.superPending - this.totalSuper
        this.newDieselPending = this.dieselPending - this.totalDiesel


 
     
        const availableRegularlUpdated = await FuelInventory.updateOne(
            {
                "inventoryCode": "t-r1"
            },
            {
                $set: {
                    "available": this.newAvRegular, "amountPending":this.newRegularPending
                }
            },
            {
                multi: false
            }
        );

        const availableSuperlUpdated = await FuelInventory.updateOne(
            {
                "inventoryCode": "t-s1"
            },
            {
                $set: {
                    "available": this.newAvSuper, "amountPending":this.newSuperPending
                }
            },
            {
                multi: false
            }
        );

        const availableDieselUpdated = await FuelInventory.updateOne(
            {
                "inventoryCode": "t-d1"
            },
            {
                $set: {
                    "available": this.newAvDiesel, "amountPending":this.newDieselPending
                }
            },
            {
                multi: false
            }
        );
        
        res.json({
            ok: true,
            availableRegularlUpdated,
            availableSuperlUpdated,
            availableDieselUpdated
            
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

};




module.exports = {
    createFuelInventory,
    readInventory,
    getFuelInventoryId,
    getFuelInventoryCode,
    getFuelIdRegular,
    getFuelIdSuper,
    getFuelIdDiesel,
    getFuelRegularByCode,
    getFuelSuperByCode,
    getFuelDieselBycode,
    getFuelInventoryAmountPending,
    getFuelInventoryAvailable,
    getFuelInventoryAvailablebyCode,
    updateAmountPending,
    updateAvailableGallonsPurchase,
    updateAvailableGallonsSale,

}