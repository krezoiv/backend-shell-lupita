
/**
 * controller for sales control
 */
const { response } = require('express');
const GeneralDispenserReader = require('../../models/fuel-station/generalDispenserReader.models');
const SalesControl = require('../../models/sales/salesControl.model');

//create a new sale control
const createSalesControl = async (req, res = response) => {
    try {
        const { salesDate } = req.body;
        const date = await SalesControl.findOne({ "salesDate": salesDate });
        if (date) {
            return res.status(400).json({
                ok: false,
                msg: 'Día ya se encuentra operado'
            });
        };

        const salesControl = new SalesControl(req.body);
        await salesControl.save();
        res.json({
            ok: true,
            msg: salesControl
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get number sales control
const getNoDocument = async (req, res = response) => {

    try {
       
        const noDocumentSale = await SalesControl.findOne({}, 'noDocument')
            .sort({ $natural: -1 }).limit(1);
        res.json({
            ok: true,
            noDocumentSale
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get sales by searchin with number sale
const getSaleByNoDocument = async (req, res = response) => {

    try {
        const { noDocument } = req.body;
        const doc = await SalesControl.findOne({ noDocument: noDocument });
        if (!doc) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró información'
            });
        };

        const salebyDocument = await SalesControl.find({ noDocument: noDocument });
        if (!salebyDocument) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe registrado un numero de orden con ese identificador'
            });
        }
        res.json({
            ok: true,
            salebyDocument
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};



//gets sales by dates
const getSaleByDates = async (req, res = response) => {

    //const from = Number(req.query.from) || 0;
    const { initialDate, finalDate, from } = req.body
    try {

        const [getData, total] = await Promise.all([
            SalesControl.find({
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)

                }
            }).skip(from)
                .limit(5).sort({ salesDate: -1 }),

            SalesControl.count()
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
}

//gets all sales
const getAllSales = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    try {

        const [getData, total] = await Promise.all([

            SalesControl.find({})
                .skip(from)
                .limit(3)
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

//sum of all sales by range dates
const countTotalSalesByDate = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const countTotalSale = await SalesControl.aggregate([{
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
        }], { $limit: 1 })

        res.json({
            ok: true,
            countTotalSale
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

};

//count all sales
const countSales = async (req, res = response) => {

    try {
        const countTotalSale = await SalesControl.count();
        res.json({
            ok: true,
            countTotalSale
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };

};

//gets greater sales
const getGreaterSale = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {
        const greaterSale = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ total: -1 }).limit(1)

        res.json({
            ok: true,
            greaterSale
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets less sales
const getLesserSale = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const lersserSale = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ total: 1 }).limit(1)

        res.json({
            ok: true,
            lersserSale
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets greater sales gallons regular
const getGreaterRegularGallons = async (req, res = response) => {
    const { initialDate, finalDate } = req.body;
    try {
        const greaterRegularGallons = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ totalGallonRegular: -1 }).limit(1);

        res.json({
            ok: true,
            greaterRegularGallons
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets lesser sales gallons regular
const getLesserRegularGallons = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const lesserRegularGallons = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ totalGallonRegular: 1 }).limit(1)

        res.json({
            ok: true,
            lesserRegularGallons
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets greater sales gallons super
const getGreaterSuperGallons = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const greaterSuperGallon = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ totalGallonSuper: -1 }).limit(1)

        res.json({
            ok: true,
            greaterSuperGallon
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets less sales gallons regular
const getLesserSuperGallons = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const lesserSuperGallons = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ totalGallonSuper: 1 }).limit(1)

        res.json({
            ok: true,
            lesserSuperGallons
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets greater sales gallons diesel
const getGreaterDieselGallons = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const greaterDieselGallons = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ totalGallonDiesel: -1 }).limit(1)

        res.json({
            ok: true,
            greaterDieselGallons
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//gets lesser sales gallons diesel
const getLesserDIeselGallons = async (req, res = response) => {
    const { initialDate, finalDate } = req.body
    try {
        const lesserDieselGallons = await SalesControl.aggregate([{
            $match: {
                "salesDate": {
                    $gte: new Date(initialDate),
                    $lte: new Date(finalDate)
                }
            }
        }]).sort({ totalGallonDiesel: 1 }).limit(1)

        res.json({
            ok: true,
            lesserDieselGallons
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const lastSaleControl = async (req, res = response) => {

    const Regular = Number;
    const Super = Number;
    const Diesel = Number
    try {
        const lastSale = await SalesControl.find()
            .populate({ path: 'generalDispenserReaderId' }
            ).sort({
                $natural: -1
            }).limit(1)

        const noDocument = await SalesControl.findOne({}, 'noDocument').sort({
            $natural: -1
        }).limit(1)


        const gnrlDispId = await SalesControl.findOne({}, 'generalDispenserReaderId').sort({
            $natural: -1
        }).limit(1)
        res.json({
            ok: true,
            lastSale,
            noDocument,
            gnrlDispId

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
    createSalesControl,
    getNoDocument,
    getSaleByNoDocument,
    getSaleByDates,
    getAllSales,
    countTotalSalesByDate,
    countSales,
    getGreaterSale,
    getLesserSale,
    getGreaterRegularGallons,
    getLesserRegularGallons,
    getGreaterSuperGallons,
    getLesserSuperGallons,
    getGreaterDieselGallons,
    getLesserDIeselGallons,
    lastSaleControl


}