/**
 * controllers for store
 */
 const { response } = require("express");
 const Stores = require('../../models/persons/store.model')
 

 //creates a new store
 const createStore = async(req, res = response) => {
     try {
         const store = new Stores(req.body);
         await store.save();
         res.json({
             ok: true,
             msg: store
         });
     } catch (error) {
         console.log(error)
         res.status(500).json({
             ok: false,
             msg: 'Error inseperado!!... Comuniquese con el administrador'
         });
     };
 };
 
//get all stores
 const getStores = async(req, res = response) => {
 
    try {
     const store = await Stores.find({}, 'storeName')
     res.json({
         ok: true,
         store,
     })
    } catch (error) {
     console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Error inseperado!!... Comuniquese con el administrador'
         });
    }
 }
 
 module.exports = {
     createStore,
     getStores
 }