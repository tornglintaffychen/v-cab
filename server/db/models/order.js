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
     }, {
         //  getterMethods: {
         //      total: function () {
         //          return this.productList.reduce(function (a, b) {
         //              return b.productPrice * b.productQty + a;
         //          }, 0);
         //      }
         //  }
     });

     // Katie review: let's make a function that checks how old the order is and delete it after 2 years. Let's also at some point figure out whether to link this by email or what. maybe a pivot table and link to users based on email? or userId?
 };
