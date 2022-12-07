/**
 controller that will have the total gallons
 that come from the dispenser reader, this will work
 to assign it to the sales summary

 controlador que tendra el total de los galones
 que vienen del dispenser reader, esto servira 
 para asignarselo al resumen de ventas
 */

const { response } = require('express');
const res = require('express/lib/response');
const GeneralDispenserReader = require('../../models/fuel-station/generalDispenserReader.models');
const DispenserReader = require('../../models/fuel-station/dispenserReaders.model');
const SalesControl = require('../../models/sales/salesControl.model');
const FuelInventory = require('../../models/fuel-station/fuelInventory.models');


//creat a new dispenser reader will have details of reading dispensers
//crear un nuevo lector de surtidores tendrá detalles de lectura de surtidores
const createGeneralDispenserReader = async (req, res = response) => {

    try {

        const { readingDate } = req.body;
        const date = await GeneralDispenserReader.findOne({ "readingDate": readingDate });
        if (date) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya se a registrado numeracíon para esta fecha '
            });
        }

        const generalDispenserReader = new GeneralDispenserReader(req.body);
        await generalDispenserReader.save();

        res.json({
            ok: true,
            msg: generalDispenserReader
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

}



// get general dispenser
const getGeneralDispenserReader = async (req, res = response) => {

    try {
        const { readingDate } = req.body;
        const generalDispenserReader = await GeneralDispenserReader.findOne({ readingDate: readingDate });

        res.json({
            ok: true,
            generalDispenserReader
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//to update gallons when user update in dispenserReader to regular
const updateTotalGallonsByUdpdatingRegular = async(req, res = response) => {
    const totalGallon = Number
    const totalMechanic = Number
    const totalMoney = Number
    const newGallon = Number
    
    const GallonDispenser = Number
    const MechanicDispenser = Number
    const MoneyDispenser = Number
    const newMechanic = Number
    
    const provisitionGallon = Number
    const provisitionMechanic = Number
    const provisitionMoney = Number
    const newMoney = Number
    
    
    
    const {assignmentHoseId, generalDispenserReaderId, readingDate, totalNoGallons, totalNoMechanic, totalNoMoney} = req.body;
    
    try {
        const actualGallons = await DispenserReader.findOne({
            $and :[
                {'assignmentHoseId': assignmentHoseId}, {'generalDispenserReaderId': generalDispenserReaderId}
            ]});
    
            this.totalGallon = actualGallons.totalNoGallons
            this.totalMechanic = actualGallons.totalNoMechanic
            this.totalMoney = actualGallons.totalNoMoney
    
            const totalGallonsDispenser = await GeneralDispenserReader.findOne({'readingDate': readingDate});
    
            this.GallonDispenser = totalGallonsDispenser.totalGallonRegular
            this.MechanicDispenser = totalGallonsDispenser.totalMechanicRegular
            this.MoneyDispenser = totalGallonsDispenser.totalMoneyRegular
    
            this.provisitionGallon =  this.GallonDispenser - this.totalGallon
            this.provisitionMechanic = this.MechanicDispenser - this.totalMechanic
            this.provisitionMoney = this.MoneyDispenser - this.totalMoney

            this.newGallon = this.provisitionGallon + totalNoGallons
            this.newMechanic = this.provisitionMechanic + totalNoMechanic
            this.newMoney = this.provisitionMoney + totalNoMoney

            const newGallonsDispenserRegular = await GeneralDispenserReader.updateOne({
                'readingDate' : readingDate
            }, {
                $set: {
                    "totalGallonRegular":this.newGallon,  "totalMechanicRegular":this.newMechanic,  "totalMoneyRegular":this.newMoney
                }
            }, { multi: false})
    
    
            res.json({
                ok: true,
                newGallonsDispenserRegular
               
            });
    
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
    

}

//to update gallons when user update in dispenserReader to super
const updateTotalGallonsByUdpdatingSuper = async(req, res = response) => {
    const totalGallon = Number
    const totalMechanic = Number
    const totalMoney = Number
    const newGallon = Number
    
    const GallonDispenser = Number
    const MechanicDispenser = Number
    const MoneyDispenser = Number
    const newMechanic = Number
    
    const provisitionGallon = Number
    const provisitionMechanic = Number
    const provisitionMoney = Number
    const newMoney = Number
    
    
    
    const {assignmentHoseId, generalDispenserReaderId, readingDate, totalNoGallons, totalNoMechanic, totalNoMoney} = req.body;
    
    try {
        const actualGallons = await DispenserReader.findOne({
            $and :[
                {'assignmentHoseId': assignmentHoseId}, {'generalDispenserReaderId': generalDispenserReaderId}
            ]});
    
            this.totalGallon = actualGallons.totalNoGallons
            this.totalMechanic = actualGallons.totalNoMechanic
            this.totalMoney = actualGallons.totalNoMoney
    
            const totalGallonsDispenser = await GeneralDispenserReader.findOne({'readingDate': readingDate});
    
            this.GallonDispenser = totalGallonsDispenser.totalGallonSuper
            this.MechanicDispenser = totalGallonsDispenser.totalMechanicSuper
            this.MoneyDispenser = totalGallonsDispenser.totalMoneySuper
    
            this.provisitionGallon =  this.GallonDispenser - this.totalGallon
            this.provisitionMechanic = this.MechanicDispenser - this.totalMechanic
            this.provisitionMoney = this.MoneyDispenser - this.totalMoney

            this.newGallon = this.provisitionGallon + totalNoGallons
            this.newMechanic = this.provisitionMechanic + totalNoMechanic
            this.newMoney = this.provisitionMoney + totalNoMoney

            const newGallonsDispenserSuper = await GeneralDispenserReader.updateOne({
                'readingDate' : readingDate
            }, {
                $set: {
                    "totalGallonSuper":this.newGallon,  "totalMechanicSuper":this.newMechanic,  "totalMoneySuper":this.newMoney
                }
            }, { multi: false})
    
    
            res.json({
                ok: true,
                newGallonsDispenserSuper
               
            });
    
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
    

}

//to update gallons when user update in dispenserReader to diesel
const updateTotalGallonsByUdpdatingDiesel = async(req, res = response) => {
    const totalGallon = Number
    const totalMechanic = Number
    const totalMoney = Number
    const newGallon = Number
    
    const GallonDispenser = Number
    const MechanicDispenser = Number
    const MoneyDispenser = Number
    const newMechanic = Number
    
    const provisitionGallon = Number
    const provisitionMechanic = Number
    const provisitionMoney = Number
    const newMoney = Number
    
    
    
    const {assignmentHoseId, generalDispenserReaderId, readingDate, totalNoGallons, totalNoMechanic, totalNoMoney} = req.body;
    
    try {
        const actualGallons = await DispenserReader.findOne({
            $and :[
                {'assignmentHoseId': assignmentHoseId}, {'generalDispenserReaderId': generalDispenserReaderId}
            ]});
    
            this.totalGallon = actualGallons.totalNoGallons
            this.totalMechanic = actualGallons.totalNoMechanic
            this.totalMoney = actualGallons.totalNoMoney
    
            const totalGallonsDispenser = await GeneralDispenserReader.findOne({'readingDate': readingDate});
    
            this.GallonDispenser = totalGallonsDispenser.totalGallonDiesel
            this.MechanicDispenser = totalGallonsDispenser.totalMechanicDiesel
            this.MoneyDispenser = totalGallonsDispenser.totalMoneyDiesel
    
            this.provisitionGallon =  this.GallonDispenser - this.totalGallon
            this.provisitionMechanic = this.MechanicDispenser - this.totalMechanic
            this.provisitionMoney = this.MoneyDispenser - this.totalMoney

            this.newGallon = this.provisitionGallon + totalNoGallons
            this.newMechanic = this.provisitionMechanic + totalNoMechanic
            this.newMoney = this.provisitionMoney + totalNoMoney

            const newGallonsDispenserDiesel = await GeneralDispenserReader.updateOne({
                'readingDate' : readingDate
            }, {
                $set: {
                    "totalGallonDiesel":this.newGallon,  "totalMechanicDiesel":this.newMechanic,  "totalMoneyDiesel":this.newMoney
                }
            }, { multi: false})
    
    
            res.json({
                ok: true,
                newGallonsDispenserDiesel
               
            });
    
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
    

}

//controller to update total general gallons on general dispener reader
const updateTotalGallons = async (req, res = response) => {



   const generalDispenserReaderId = req.params.id;
    try {
        const genrealDispenserReader = await GeneralDispenserReader.findById(generalDispenserReaderId);
        if (!genrealDispenserReader) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro informacíon'
            });
        };

        const changes = {
            ...req.body
        }

        const gallonsChange = await GeneralDispenserReader.findByIdAndUpdate(generalDispenserReaderId, changes, { new: true });
        res.json({
            ok: true,
            gallonsChange
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//get the total gallonage geneal dispenser reader this for uptdate totals
const getTotals = async (req, res = response) => {

    //const { generalDispenserReaderId} = req.body;

    try {
        const noGallons = await GeneralDispenserReader.findOne({
            /*"generalDispenserReaderId" : generalDispenserReaderId*/
        },
            "totalGallonRegular totalMechanicRegular totalMoneyRegular totalGallonSuper totalMechanicSuper totalMoneySuper totalGallonDiesel totalMechanicDiesel totalMoneyDiesel totalGallonVpower totalMechanicVpower totalMoneyVpower"
        ).sort({
            $natural: -1
        }).limit(1)
        res.json({
            ok: true,
            noGallons
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get total of gallons of regular
const getTotalRegularGallons = async (req, res = response) => {
    const { readingDate } = req.body;
    try {
        const totalRegularGallons = await GeneralDispenserReader.findOne({ "readingDate": readingDate }, 'totalMechanicRegular');
        res.json({
            ok: true,
            totalRegularGallons

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};
//get total of gallons of regsuperular
const getTotalSuperGallons = async (req, res = response) => {
    const { readingDate } = req.body;
    try {
        const totalSuperGallons = await GeneralDispenserReader.findOne({ "readingDate": readingDate }, 'totalMechanicSuper');
        res.json({
            ok: true,
            totalSuperGallons
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};

//get total of gallons of diesel
const getTotalDieselGallons = async (req, res = response) => {
    const { readingDate } = req.body;
    try {
        const totalDieselGallons = await GeneralDispenserReader.findOne({ "readingDate": readingDate }, 'totalMechanicDiesel');
        res.json({
            ok: true,
            totalDieselGallons
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};

//sums of numbering regular gallons
const countGallonsRegular = async (req, res = response) => {

    try {
        const countGallonsRegular = await GeneralDispenserReader.aggregate([{ $match: { applied: false } }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicRegular", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countGallonsRegular
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//sums of numbering super gallons
const countGallonsSuper = async (req, res = response) => {

    try {
        const countGallonsSuper = await GeneralDispenserReader.aggregate([{ $match: { applied: false } }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicSuper", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countGallonsSuper
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//sums of numbering diesel gallons
const countGallonsDiesel = async (req, res = response) => {

    try {
        const countGallonsDiesel = await GeneralDispenserReader.aggregate([{ $match: { applied: false } }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicDiesel", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countGallonsDiesel
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//TODO : modificar las fechas para cierre de mes, listo rango de fechas corregidas
//gets by dates range all general dispensers readers,
//obtiene por fechas los contadores de bombas
const getGeneralDispenserReaderByDate = async (req, res = response) => {

    const { initialDate, finalDate } = req.body
    try {
        const getData = await GeneralDispenserReader.find({
            "readingDate": {
                $gte: new Date(initialDate),
                $lte: new Date(finalDate)

            }
        });

        res.json({
            ok: true,
            getData
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets list of general dispenser readers withs range dates and apllied false to close month
const getGeneralDispenserReadertoCLoseMonth = async (req, res = response) => {

    const totalGallonRegular = Number;
    const totalGallonSuper = Number;
    const totalGallonDiesel = Number;
    const totalMoneyRegular = Number;
    const totalMoneySuper = Number;
    const totalMoneyDiesel = Number;
    const totlGallons = Number

    const { initialDate, finalDate } = req.body
    try {
        const genrealDispenserReader = await SalesControl.find({
                    "salesDate": {
                        $gte: new Date(initialDate),
                        $lte: new Date(finalDate)
                    }
                }).sort({
            $natural: -1
        }).populate('generalDispenserReaderId');
        //fuel accumulated counter
        const countGallonRegular = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicRegular", 3] } }
            }
        }], { $limit: 1 });

        const countGallonSuper = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicSuper", 3] } }
            }
        }], { $limit: 1 });

        const countGallonDiesel = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicDiesel", 3] } }
            }
        }], { $limit: 1 });

        //fuel accumulated money counter
        const countMoneyRegular = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMoneyRegular", 3] } }
            }
        }], { $limit: 1 });

        const countMoneySuper = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMoneySuper", 3] } }
            }
        }], { $limit: 1 });

        const countMoneyDiesel = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMoneyDiesel", 3] } }
            }
        }], { $limit: 1 });


        //bills accumulated counter
        const countBills = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$bills", 3] } }
            }
        }], { $limit: 1 });

        //vales accumulated counter
        const countvales = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$vales", 3] } }
            }
        }], { $limit: 1 });

        //coupons accumulated counter
        const countcoupons = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$cupones", 3] } }
            }
        }], { $limit: 1 });

        //voucher accumulated counter
        const countvoucher = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$vouchers", 3] } }
            }
        }], { $limit: 1 });

        //voucher accumulated counter
        const countdeposits = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$deposits", 3] } }
            }
        }], { $limit: 1 });

        //credits accumulated counter
        const countcredits = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$credits", 3] } }
            }
        }], { $limit: 1 });

        //abonos accumulated counter
        const countabonos = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { 
                    $sum: { $round: [
                        {
                            $add:[{
                                $round: ["$bills",3]
                            }, {
                                $round :["$vales", 3]
                            }, {
                                $round :["$cupones",3]
                            }, { 
                                $round :["$vouchers",3]
                            }, {
                                $round :["$credits",3]
                            }]
                        }
                    ,3]}
                 }
            }
        }], { $limit: 1 });

        //total accumulated counter
        const counttotal = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$total", 3] } }
            }
        }], { $limit: 1 });

        //total accumulated counter
        const countbalance = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$balance", 3] } }
            }
        }], { $limit: 1 });

        //Sum of all accumulated counter gallons
        const sumTotalGallon = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: {
                    $sum: {
                        $add: [{
                            $round: ["$totalMechanicRegular", 3]
                        }, {
                            $round: ["$totalMechanicSuper", 3]
                        }, {
                            $round: ["$totalMechanicDiesel", 3]
                        }]
                    }
                },

            },
        }], { $limit: 1 });

        //Sum of all accumulated counter gallons money
        const sumMoneyGallon = await GeneralDispenserReader.aggregate([{
            $match: {
                $and: [
                    {
                        "readingDate": {
                            $gte: new Date(initialDate),
                            $lte: new Date(finalDate)
                        }
                    }
                ]
            }
        }, {
            $group: {
                _id: "",
                count: {
                    $sum: {
                        $add: [{
                            $round: ["$totalMoneyRegular", 3]
                        }, {
                            $round: ["$totalMoneySuper", 3]
                        }, {
                            $round: ["$totalMoneyDiesel", 3]
                        }]
                    }
                },

            },
        }], { $limit: 1 })


        res.json({
            ok: true,
            genrealDispenserReader,
            countGallonRegular,
            countGallonSuper,
            countGallonDiesel,
            countMoneyRegular,
            countMoneySuper,
            countMoneyDiesel,
            countBills,
            countvales,
            countcoupons,
            countvoucher,
            countdeposits,
            countcredits,
            countabonos,
            counttotal,
            countbalance,
            sumTotalGallon,
            sumMoneyGallon
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

//delete a dispenser reader detail, elimina un detall de numeracion
const deleteGeneralDispenserReaderDetails = async (req, res = response) => {
    const { generalDispenserReaderId, salesDate } = req.body;
    try {
        const existId = await SalesControl.findOne({ generalDispenserReaderId });

        if (existId) {
            return res.status(400).json({
                ok: false,
                msg: " ¡¡Existe venta registrada para estos registros, para eliminar numeración deberá eliminar cierre de venta!!"
            });
        }

        const deleteDetail = await DispenserReader.deleteMany({ generalDispenserReaderId: generalDispenserReaderId })

        const deleteGnrDispenser = await GeneralDispenserReader.findByIdAndDelete(generalDispenserReaderId)
        res.json({
            ok: true,
            deleteDetail,
            deleteGnrDispenser,
            existId
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}


//cierre de mes de lecturas
//when close month reset values 
const uptadeCloseMonthReader = async (req, res = responser) => {

    const { initialDate, finalDate } = req.body
    try {
        const closeMonthReader = await GeneralDispenserReader.updateMany({
            "readingDate": {
                $gte: new Date(initialDate),
                $lte: new Date(finalDate)

            }
        }, { $set: { applied: true } });


        res.json({
            ok: true,
            closeMonthReader
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//counts regular gallons by range dates, cuenta los galones regular por fechad e
const countTotalRegularGallonsSalesByDate = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const countTotalSaleRegular = await GeneralDispenserReader.aggregate([{
            $match: {
                "readingDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicRegular", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalSaleRegular
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//counts super gallons by range dates, cuenta los galones super por fechad 
const countTotalSuperGallonsSalesByDate = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const countTotalSaleSuper = await GeneralDispenserReader.aggregate([{
            $match: {
                "readingDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicSuper", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalSaleSuper
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//counts diesel gallons by range dates, cuenta los galones diesel por fechad 
const countTotalDieselGallonsSalesByDate = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const countTotalSaleDiesel = await GeneralDispenserReader.aggregate([{
            $match: {
                "readingDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }
        }, {
            $group: {
                _id: "",
                count: { $sum: { $round: ["$totalMechanicDiesel", 3] } }
            }
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalSaleDiesel
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//delet a sale and modifies values on inventory
const deleteSales = async (req, res = response) => {

    const { generalDispenserReaderId, salesDate, noDocument, fuelId } = req.body;
    const regularAmount = Number
    const superAmount = Number
    const dieselAmount = Number
    const superAmountInventory = Number
    const regularAmountInventory = Number
    const dieselAmountInventory = Number
    const totalRegular = Number
    const totalSuper = Number
    const totalDiesel = Number
    const inventoryCodeSuper = 't-s1'
    const inventoryCodeRegular = 't-r1'
    const inventoryCodeDiesel = 't-d1'
    const idFuelSuper = String
    const idFuelRegular = String
    const idFuelDiesel = String


    try {
        const inventoryIdFuelSuper = await FuelInventory.findOne({ inventoryCode: inventoryCodeSuper }, 'fuelId'); //obitiene el Id fuel super
        this.idFuelSuper = inventoryIdFuelSuper.fuelId //asignacion del id super a la variable 
        const findAmountSuper = await SalesControl.findOne({ 'noDocument': noDocument }, 'totalGallonSuper')// busqueda del monto del detalle super
        this.superAmount = findAmountSuper.totalGallonSuper
        const findAvailableInventorySuper = await FuelInventory.findOne({ 'fuelId': this.idFuelSuper }, 'available')// busqueda del monto apending del detalle
        this.superAmountInventory = findAvailableInventorySuper.available
        this.totalSuper = this.superAmountInventory + this.superAmount

        const updateAvailiableSuper = await FuelInventory.updateOne({
            "fuelId": this.idFuelSuper
        }, {
            $set: {
                "available": this.totalSuper
            }
        }, {
            multi: false
        }
        )

        const inventoryIdFuelRegular = await FuelInventory.findOne({ inventoryCode: inventoryCodeRegular }, 'fuelId'); //obitiene el Id fuel super
        this.idFuelRegular = inventoryIdFuelRegular.fuelId //asignacion del id super a la variable 
        const findAmountRegular = await SalesControl.findOne({ 'noDocument': noDocument }, 'totalGallonRegular')// busqueda del monto del detalle super
        this.regularAmount = findAmountRegular.totalGallonRegular
        const findAvailableInventoryRegular = await FuelInventory.findOne({ 'fuelId': this.idFuelRegular }, 'available')// busqueda del monto apending del detalle
        this.regularAmountInventory = findAvailableInventoryRegular.available
        this.totalRegular = this.regularAmountInventory + this.regularAmount

        const updateAvailiableRegular = await FuelInventory.updateOne({
            "fuelId": this.idFuelRegular
        }, {
            $set: {
                "available": this.totalRegular
            }
        }, {
            multi: false
        }
        )


        const inventoryIdFuelDiesel = await FuelInventory.findOne({ inventoryCode: inventoryCodeDiesel }, 'fuelId'); //obitiene el Id fuel super
        this.idFuelDiesel = inventoryIdFuelDiesel.fuelId //asignacion del id super a la variable 
        const findAmountDiesel = await SalesControl.findOne({ 'noDocument': noDocument }, 'totalGallonDiesel')// busqueda del monto del detalle super
        this.dieselAmount = findAmountDiesel.totalGallonDiesel
        const findAvailableInventoryDiesel = await FuelInventory.findOne({ 'fuelId': this.idFuelDiesel }, 'available')// busqueda del monto apending del detalle
        this.dieselAmountInventory = findAvailableInventoryDiesel.available
        this.totalDiesel = this.dieselAmountInventory + this.dieselAmount

        const updateAvailiableDiesel = await FuelInventory.updateOne({
            "fuelId": this.idFuelDiesel
        }, {
            $set: {
                "available": this.totalDiesel
            }
        }, {
            multi: false
        }
        )

        const deleteSale = await SalesControl.findOneAndDelete({ generalDispenserReaderId: generalDispenserReaderId })

        res.json({
            ok: true,
            findAmountRegular,
            findAmountSuper,
            findAmountDiesel,
            findAvailableInventorySuper,
            findAvailableInventoryRegular,
            findAvailableInventoryDiesel,
            updateAvailiableSuper,
            updateAvailiableRegular,
            updateAvailiableDiesel,
            deleteSale


        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }
}

const readTotalGallonDB = async (req, res = response) => {
    const { readingDate } = req.body

    try {
        const totalRegularGallons = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalGallonRegular')
        const totalMechanicRegular = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalMechanicRegular')
        const totalMoneyRegular = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalMoneyRegular')
        const totalGallonSuper = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalGallonSuper')
        const totalMechanicSuper = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalMechanicSuper')
        const totalMoneySuper = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalMoneySuper')
        const totalGallonDiesel = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalGallonDiesel')
        const totalMechanicDiesel = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalMechanicDiesel')
        const totalMoneyDiesel = await GeneralDispenserReader.findOne({ 'readingDate': readingDate }, 'totalMoneyDiesel')

        res.json({
            ok: true,
            totalRegularGallons,
            totalMechanicRegular,
            totalMoneyRegular,
            totalGallonSuper,
            totalMechanicSuper,
            totalMoneySuper,
            totalGallonDiesel,
            totalMechanicDiesel,
            totalMoneyDiesel
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const readTotalMechanicRegular = async (req, res = response) => {
    const { readingDate } = req.body;
    try {
        const totalRegularMechanic = await GeneralDispenserReader.findOne({ "readingDate": readingDate }, 'totalMechanicRegular');
        res.json({
            ok: true,
            totalRegularMechanic

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    };
};

const readTotalMoneyRegular = async (req, res = response) => {
    const { readingDate } = req.body;
    try {
        const totalRegularMoney = await GeneralDispenserReader.findOne({ "readingDate": readingDate }, 'totalMoneyRegular');

        res.json({
            ok: true,
            totalRegularMoney

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });

    }
};

const getLastGeneralDispenserReader = async (req, res = response) => {
    const id = String
    try {
        const generalDispId = await GeneralDispenserReader.findOne({},
            'generalDispenserReaderId').sort({
                $natural: -1
            }).limit(1);

        this.id = generalDispId
       
        res.json({
            ok: true,
            generalDispId
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
    createGeneralDispenserReader,
    getGeneralDispenserReader,
    updateTotalGallons,
    getTotals,
    getTotalRegularGallons,
    getTotalSuperGallons,
    getTotalDieselGallons,
    countGallonsRegular,
    countGallonsSuper,
    countGallonsDiesel,
    getGeneralDispenserReaderByDate,
    uptadeCloseMonthReader,
    deleteGeneralDispenserReaderDetails,
    countTotalRegularGallonsSalesByDate,
    countTotalSuperGallonsSalesByDate,
    countTotalDieselGallonsSalesByDate,
    deleteSales,
    readTotalGallonDB,
    readTotalMechanicRegular,
    readTotalMoneyRegular,
    getLastGeneralDispenserReader,
    getGeneralDispenserReadertoCLoseMonth,
    updateTotalGallonsByUdpdatingRegular,
    updateTotalGallonsByUdpdatingSuper,
    updateTotalGallonsByUdpdatingDiesel

}
