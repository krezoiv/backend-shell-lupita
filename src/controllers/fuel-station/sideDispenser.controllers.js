/**
 * controllers for sides dispensers
 * 
 */

const {response} = require('express');
const SideDispenser = require('../../models/fuel-station/sidedispenser.model');


//gets all sides dispensers
const getSideDispenser = async(req, res = response) => {
    try {
        const sideDispenser = await SideDispenser.find({})
            
        res.json({
            ok: true,
            sideDispenser
        });       
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }        
    
}



//get sideA dispenser
const getSideA = async(req, res = response) => {
    try {
        const sideDispenser = await SideDispenser.findOne({'sideName' : "Lado A"})
            
        res.json({
            ok: true,
            sideDispenser
        });       
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }        
    
}

//get sideB dispenser
const getSideB = async(req, res = response) => {
    try {
        const sideDispenser = await SideDispenser.findOne({'sideName' : "Lado B"})
            
        res.json({
            ok: true,
            sideDispenser
        });       
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
    }        
    
}

//creats a new dispenser
const createSideDispenser = async(req, res = response) => {

    try {
        const sideDispenser = new SideDispenser(req.body);
        await sideDispenser.save();

        res.json({
            ok: true,
            msg: sideDispenser
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado!!... Comuniquese con el administrador'
        });
        
    };
};



module.exports ={
    createSideDispenser,
    getSideDispenser,
    getSideA,
    getSideB
}