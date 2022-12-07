/**
 *? controller for invoice payment type
 *? controlador para el tipo de pago de factura
 */


 const { response } = require('express');
 const PaymentMethods = require('../../models/documents/paymentMethods.model');
 
  /**
  * ?create the payment method
  * ?crea el metodo de pago
  */
 const createPaymentMethod = async (req, res = response) => {
 
     try {
         const paymentMethod = new PaymentMethods(req.body);
         await paymentMethod.save();
 
         res.json({
             ok: true,
             paymentMethod
         });
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Error inseperado!!... Comuniquese con el administrador'
         });
     };
 };
 
 /**
  * ?get the payment method
  * ?obtiene el metodo de pago
  */
 const getPaymentMethod = async (req, res = response) => {
     try {
         
         const paymentMethod = await PaymentMethods.find({}, 'method')
         res.json({
             ok: true,
             paymentMethod
         });
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Error inseperado!!... Comuniquese con el administrador'
         });
     };
 };
 
 module.exports = {
     getPaymentMethod,
     createPaymentMethod
 }