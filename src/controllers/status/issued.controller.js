/**
 * 
 */
const { response } = require('express');
const Issued = require( '../../models/status/issued.models');

const createIssued = async ( req, res = response) => {
    
    const issued = new Issued(req.body);
    await issued.save();

    res.json({
        ok: true,
        issued
    });
};

module.exports = {
    createIssued
}