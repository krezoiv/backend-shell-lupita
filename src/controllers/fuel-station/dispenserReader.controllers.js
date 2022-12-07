/**
 * reading socket controller
 *  controlador de la toma de lectura
 */

const { response } = require('express');
const DispenserReader = require('../../models/fuel-station/dispenserReaders.model');
const fuelInventory = require('../../models/fuel-station/fuelInventory.models');
const GeneralDispenserReader = require('../../models/fuel-station/generalDispenserReader.models')

const createDispenserReader = async (req, res = response) => {

    const { generalDispenserReaderId, assignmentHoseId, fuelId,totalNoGallons } = req.body;
    try {
       
        const assignemtDispenserReader = await DispenserReader.findOne({
            $and: [{ "generalDispenserReaderId": generalDispenserReaderId }, { "assignmentHoseId": assignmentHoseId }]
        });
        if (assignemtDispenserReader) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya se a registrado numeracíon de esta manguera para esta fecha '
            });

        }
        
        const dispenserReader = new DispenserReader(req.body);
        await dispenserReader.save();

        res.json({
            ok: true,
            dispenserReader: dispenserReader
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

const getPreviousNumberGallonRegular = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoGallons = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoGallons').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoGallons
    });
};

const getPreviousNumberMechanicRegular = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoMechanicR = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMechanic').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoMechanicR
    });
};

const getPreviousNumberMoneyRegular = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoMoneyR = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMoney').sort({
        $natural: -1
    }).limit(1);
    res.json({
        ok: true,
        previousNoMoneyR
    });
};


//to calculate the penultimate record // para calcular el penultimo registro
const getPreviousNumberGallonRegular1 = async (req, res = response) => {
    const actual = Number;
    const totalBD = Number;
    

    const { assignmentHoseId } = req.body;
    const previousNoGallonsRegular = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'totalNoGallons actualNoGallons').sort({
        $natural: -1
    }).limit(1);

    this.actual = previousNoGallonsRegular.actualNoGallons;
    this.totalBD = previousNoGallonsRegular.totalNoGallons;
    const totalPreviousGallon = this.actual - this.totalBD

    
    res.json({
        ok: true,
        previousNoGallonsRegular,
        totalPreviousGallon
       
    });
};

//get previous reading
const getPreviousTotalNoGallonRegular = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousTotalNoGallonRegular = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'totalNoGallons').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousTotalNoGallonRegular
    });
};

//get previous reading
const getPreviousNumberMechanicRegular1 = async (req, res = response) => {
    const actual = Number;
    const totalBD = Number;
    
    const { assignmentHoseId } = req.body;
    const previousNoMechanicRegular = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, ' totalNoMechanic actualNoMechanic' ).sort({
        $natural: -1
    }).limit(1);

    this.actual = previousNoMechanicRegular.actualNoMechanic;
    this.totalBD = previousNoMechanicRegular.totalNoMechanic;
    const totalPreviousMechanic = this.actual - this.totalBD

    res.json({
        ok: true,
        previousNoMechanicRegular,
        totalPreviousMechanic
    });
};

//get previous reading
const getPreviousTotalNoMechanicRegular = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousTotalNoMechanicRegular = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'totalNoMechanic').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousTotalNoMechanicRegular
    });
};

//get previous reading
const getPreviousNumberMoneyRegular1 = async (req, res = response) => {
    const actual = Number;
    const totalBD = Number;

    const { assignmentHoseId } = req.body;
    const previousNoMoneyRegular = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMoney totalNoMoney').sort({
        $natural: -1
    }).limit(1);

    this.actual = previousNoMoneyRegular.actualNoMoney;
    this.totalBD = previousNoMoneyRegular.totalNoMoney;
    const totalPreviousMoney = this.actual - this.totalBD
    res.json({
        ok: true,
        previousNoMoneyRegular,
        totalPreviousMoney
    });
};

//get previous reading
const getPreviousTotalNoMoneyRegular = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousTotalNoMoneyRegular = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'totalNoMoney').sort({
        $natural: -1
    }).limit(1);
    res.json({
        ok: true,
        previousTotalNoMoneyRegular
    });
};


//get previous reading
const getPreviousNumberGallonSuper = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoGallonsSuper = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoGallons').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoGallonsSuper
    });
}

//get previous reading
const getPreviousNumberMechanicSuper = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoMechanicSuper = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMechanic').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoMechanicSuper
    });
}

//get previous reading
const getPreviousNumberMoneySuper = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoMoneySuper = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMoney').sort({
        $natural: -1
    }).limit(1)

    res.json({
        ok: true,
        previousNoMoneySuper
    });
}

//get previous reading
const penultimateNumberGallonRegular = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const penultimateNoGallons = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoGallons').sort({
        $natural: -1
    }).limit(2);

    res.json({
        ok: true,
        penultimateNoGallons
    });
}


//get previous reading
const getPreviousNumberGallonSuper1 = async (req, res = response) => {
    const actual = Number;
    const totalBD = Number;

    const { assignmentHoseId } = req.body;
    const previousNoGallonsSuper1 = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, ' totalNoGallons actualNoGallons').sort({
        $natural: -1
    }).limit(1);

    this.actual = previousNoGallonsSuper1.actualNoGallons;
    this.totalBD = previousNoGallonsSuper1.totalNoGallons;
    const totalPreviousGallon = this.actual - this.totalBD

    res.json({
        ok: true,
        previousNoGallonsSuper1,
        totalPreviousGallon
    });
}

//get previous reading
const getPreviousTotalNoGallonSuper = async (req, res = response) => {

    try {
        const { assignmentHoseId } = req.body;
        const previousTotalNoGallonsSuper = await DispenserReader.findOne({
            "assignmentHoseId": assignmentHoseId
        }, 'totalNoGallons').sort({
            $natural: -1
        }).limit(1);

        res.json({
            ok: true,
            previousTotalNoGallonsSuper
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};


//get previous reading
const getPreviousNumberMechanicSuper1 = async (req, res = response) => {
    const actual = Number;
    const totalBD = Number;
    
    const { assignmentHoseId } = req.body;
    const previousNoMechanicSuper1 = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, ' totalNoMechanic actualNoMechanic').sort({
        $natural: -1
    }).limit(1);

    this.actual = previousNoMechanicSuper1.actualNoMechanic;
    this.totalBD = previousNoMechanicSuper1.totalNoMechanic;
    const totalPreviousMechanic = this.actual - this.totalBD
    res.json({
        ok: true,
        previousNoMechanicSuper1,
        totalPreviousMechanic
    });
};

//get previous reading
const getPreviousTotalNoMechanicSuper = async (req, res = response) => {

    try {
        const { assignmentHoseId } = req.body;
        const previousTotalNoMechanicSuper = await DispenserReader.findOne({
            "assignmentHoseId": assignmentHoseId
        }, 'totalNoMechanic').sort({
            $natural: -1
        }).limit(1);

        res.json({
            ok: true,
            previousTotalNoMechanicSuper
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get previous reading
const getPreviousNumberMoneySuper1 = async (req, res = response) => {
    const actual = Number;
    const totalBD = Number;

    const { assignmentHoseId } = req.body;
    const previousNoMoneySuper1 = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMoney totalNoMoney').sort({
        $natural: -1
    }).limit(1)

    this.actual = previousNoMoneySuper1.actualNoMoney;
    this.totalBD = previousNoMoneySuper1.totalNoMoney;
    const totalPreviousMoney = this.actual - this.totalBD
    res.json({
        ok: true,
        previousNoMoneySuper1,
        totalPreviousMoney
    });
};

//get previous reading
const getPreviousTotalNoMoneySuper = async (req, res = response) => {

    try {
        const { assignmentHoseId } = req.body;
        const previousTotalNoMoneySuper = await DispenserReader.findOne({
            "assignmentHoseId": assignmentHoseId
        }, 'totalNoMoney').sort({
            $natural: -1
        }).limit(1);

        res.json({
            ok: true,
            previousTotalNoMoneySuper
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get previous reading
const getPreviousNumberGallonDiesel = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoGallonsDiesel = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoGallons').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoGallonsDiesel
    });
}

//get previous reading
const getPreviousNumberMechanicDiesel = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoMechanicDiesel = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMechanic').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoMechanicDiesel
    });
}

//get previous reading
const getPreviousNumberMoneyDiesl = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoMoneyDiesel = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMoney').sort({
        $natural: -1
    }).limit(1)

    res.json({
        ok: true,
        previousNoMoneyDiesel
    });
}

//get previous reading
const getPreviousNumberGallonDiesel1 = async (req, res = response) => {

    const actual = Number;
    const totalBD = Number;

    const { assignmentHoseId } = req.body;
    const previousNoGallonsDiesel1 = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoGallons totalNoGallons').sort({
        $natural: -1
    }).limit(1);
    this.actual = previousNoGallonsDiesel1.actualNoGallons;
    this.totalBD = previousNoGallonsDiesel1.totalNoGallons;
    const totalPreviousGallon = this.actual - this.totalBD

    res.json({
        ok: true,
        previousNoGallonsDiesel1,
        totalPreviousGallon
    });
}

//get previous reading
const getPreviousTotalNoGallonDiesel = async (req, res = response) => {

    try {
        const { assignmentHoseId } = req.body;
        const previousTotalNoGallonsDiesel = await DispenserReader.findOne({
            "assignmentHoseId": assignmentHoseId
        }, 'totalNoGallons').sort({
            $natural: -1
        }).limit(1);

        res.json({
            ok: true,
            previousTotalNoGallonsDiesel
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get previous reading
const getPreviousNumberMechanicDiesel1 = async (req, res = response) => {

    const actual = Number;
    const totalBD = Number;

    const { assignmentHoseId } = req.body;
    const previousNoMechanicDiesel1 = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMechanic totalNoMechanic').sort({
        $natural: -1
    }).limit(1);
    this.actual = previousNoMechanicDiesel1.actualNoMechanic;
    this.totalBD = previousNoMechanicDiesel1.totalNoMechanic;
    const totalPreviousMechanic = this.actual - this.totalBD

    res.json({
        ok: true,
        previousNoMechanicDiesel1,
        totalPreviousMechanic
    });
};

//get previous reading
const getPreviousTotalNoMechanicDiesel = async (req, res = response) => {

    try {
        const { assignmentHoseId } = req.body;
        const previousTotalNoMechanicDiesel = await DispenserReader.findOne({
            "assignmentHoseId": assignmentHoseId
        }, 'totalNoMechanic').sort({
            $natural: -1
        }).limit(1);

        res.json({
            ok: true,
            previousTotalNoMechanicDiesel
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get previous reading
const getPreviousNumberMoneyDiesel1 = async (req, res = response) => {

    const actual = Number;
    const totalBD = Number;

    const { assignmentHoseId } = req.body;
    const previousNoMoneyDiesel1 = await DispenserReader.findOne({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMoney totalNoMoney').sort({
        $natural: -1
    }).limit(1);
    this.actual = previousNoMoneyDiesel1.actualNoMoney;
    this.totalBD = previousNoMoneyDiesel1.totalNoMoney;
    const totalPreviousMoney = this.actual - this.totalBD

    res.json({
        ok: true,
        previousNoMoneyDiesel1,
        totalPreviousMoney
    });
};

//get previous reading
const getPreviousTotalNoMoneyDiesel = async (req, res = response) => {

    try {
        const { assignmentHoseId } = req.body;
        const previousTotalNoMoneyDiesel = await DispenserReader.findOne({
            "assignmentHoseId": assignmentHoseId
        }, 'totalNoMechanic').sort({
            $natural: -1
        }).limit(1);

        res.json({
            ok: true,
            previousTotalNoMoneyDiesel
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    };
};

//get previous reading
const getPreviousNumberGallonVpower = async (req, res = response) => {

    const { assignmentHoseId } = req.body;
    const previousNoGallons = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoGallons').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoGallons
    });
}

//get previous reading
const getPreviousNumberMechanicVpower = async (req, res = response) => {
    const { assignmentHoseId } = req.body;
    const previousNoMechanic = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMechanic').sort({
        $natural: -1
    }).limit(1);

    res.json({
        ok: true,
        previousNoMechanic
    });
}

//get previous reading
const getPreviousNumberMoneyVpower = async (req, res = response) => {
    const { assignmentHoseId } = req.body;
    const previousNoMoney = await DispenserReader.find({
        "assignmentHoseId": assignmentHoseId
    }, 'actualNoMoney').sort({
        $natural: -1
    }).limit(1)

    res.json({
        ok: true,
        previousNoMoney
    });
}


//to list the numbering of the current day, para listar la numeracion del dia actual
const getResumeNumerationDispenser = async (req, res = response) => {
    const { generalDispenserReaderId } = req.body;

    try {

        const listNumerationDispenser = await DispenserReader.find({
            "generalDispenserReaderId": generalDispenserReaderId
        })
            .populate({
                path: 'assignmentHoseId',
                populate: {
                    path: 'assignmentId',
                    populate: {
                        path: 'dispenserId',
                        populate: { path: 'islandId' }
                    }
                }
            })
            .populate({
                path: 'assignmentHoseId',
                populate: { path: 'sideId' }
            })
            .populate({
                path: 'assignmentHoseId',
                populate: {
                    path: 'hoseId',
                    populate: { path: 'fuelId' }
                }
            })


        res.json({
            ok: true,
            listNumerationDispenser
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

}



const getResumeLastNumerationDispenser = async (req, res = response) => {
    const { generalDispenserReaderId } = req.body;
    const id = String
    const gnrlDate = String

    try {

        const generalDispId = await GeneralDispenserReader.findOne({},
            'generalDispenserReaderId').sort({
               $natural: -1                
            }).limit(1);

            this.id = generalDispId

            const generalDispDate = await GeneralDispenserReader.findOne({},
                'readingDate').sort({
                   $natural: -1                
                }).limit(1);
    
                this. gnrlDate = generalDispDate

        const listNumerationDispenser = await DispenserReader.find({
            generalDispenserReaderId : this.id
        })
            .populate({
                path: 'assignmentHoseId',
                populate: {
                    path: 'assignmentId',
                    populate: {
                        path: 'dispenserId',
                        populate: { path: 'islandId' }
                    }
                }
            })
            .populate({
                path: 'assignmentHoseId',
                populate: { path: 'sideId' }
            })
            .populate({
                path: 'assignmentHoseId',
                populate: {
                    path: 'hoseId',
                    populate: { path: 'fuelId' }
                }
            })
            .populate({
                path: 'generalDispenserReaderId'
            })


        res.json({
            ok: true,
            listNumerationDispenser,
            generalDispId,
            generalDispDate
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }

}


//to update pump data
const updateDispenserReader = async (req, res = response) => {
    const dispenserReaderId = req.params.id;

    const {fuelId,totalNoGallons } = req.body;
    try {
        const dispenserReader = await DispenserReader.findById(dispenserReaderId);
        if (!dispenserReader) {
            return res.status(400).json({
                ok: false,
                msg: 'Detalle no encontrado DPR'
            });
        }

        const dispenserAvailable = await fuelInventory.findOne({
            "fuelId" : fuelId
        }, 'available');


        if(dispenserAvailable < totalNoGallons){
            return res.status(400).json({
                ok: false,
                msg: 'No se puede guardar, combustible insuficiente '
            });
        }

        const dispenserReaderChanges = {
            ...req.body
        };

        const dispenserReaderUpdated = await DispenserReader.findByIdAndUpdate(dispenserReaderId, dispenserReaderChanges, { new: true });
       
        res.json({
            ok: true,
            disepenserReader: dispenserReaderUpdated
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado!!... Comuniquese con el administrador'
        });
    };
};



module.exports = {
    createDispenserReader,
    getPreviousNumberGallonRegular,
    getPreviousNumberMechanicRegular,
    getPreviousNumberMoneyRegular,
    getPreviousNumberGallonSuper,
    getPreviousNumberMechanicSuper,
    getPreviousNumberMoneySuper,
    getPreviousNumberGallonDiesel,
    getPreviousNumberMechanicDiesel,
    getPreviousNumberMoneyDiesl,
    getPreviousNumberGallonVpower,
    getPreviousNumberMechanicVpower,
    getPreviousNumberMoneyVpower,
    getResumeNumerationDispenser,
    updateDispenserReader,
    penultimateNumberGallonRegular,
    getPreviousNumberGallonRegular1,
    getPreviousNumberMechanicRegular1,
    getPreviousNumberMoneyRegular1,
    getPreviousNumberGallonSuper1,
    getPreviousNumberMechanicSuper1,
    getPreviousNumberMoneySuper1,
    getPreviousNumberGallonDiesel1,
    getPreviousNumberMechanicDiesel1,
    getPreviousNumberMoneyDiesel1,
    getPreviousTotalNoGallonRegular,
    getPreviousTotalNoMechanicRegular,
    getPreviousTotalNoMoneyRegular,
    getPreviousTotalNoGallonSuper,
    getPreviousTotalNoMechanicSuper,
    getPreviousTotalNoMoneySuper,
    getPreviousTotalNoGallonDiesel,
    getPreviousTotalNoMechanicDiesel,
    getPreviousTotalNoMoneyDiesel,
    getResumeLastNumerationDispenser

}