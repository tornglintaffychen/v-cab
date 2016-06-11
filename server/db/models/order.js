 'use strict';
 var Sequelize = require('sequelize');

 module.exports = function (db) {

     db.define('order', {
         status: {
             type: Sequelize.ENUM('inCart', 'received', 'processing', 'shipped', 'delivered', 'returnProcessing', 'returned'),
             defaultValue: 'inCart'
         },
         purchaseDate: {
             type: Sequelize.DATE,
             defaultValue: Sequelize.NOW
         }
     });
    
 };
