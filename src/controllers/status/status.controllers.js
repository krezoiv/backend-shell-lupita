/**
 * 
 */
const Status = require( '../../models/status/status.models');
const {response} = require('express')

const createStatus = async ( req, res = response) => {

    const { statusName } = req.body;

    const status = new Status ( req.body );
    await status.save();

    res.json({
       
        ok: true,
        status

    });

};

const getStatus = async ( req, res ) => {

    const status = await Status.find( {}, 'statusName' );

    res.json({
        ok:true,
        status
    });

};

module.exports = {
    createStatus,
    getStatus
}