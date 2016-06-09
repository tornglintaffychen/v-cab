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
         },
         productList: {
             // [{productId: id, productPrice: price, productQty: num}, {productId: id, productPrice: price, productQty: num}]
             //YI: this seems weird. making it an array of objects will make it hard to use the cart. you'll have to parse it yourself to do things like remove an item or change a quantity. I think it would be much easier to store this on a seperate table, something like "cartItem" which will hold onto the product id and the quantity. the way you have it now you're not getting the benefits of any of the sequelize methods
             type: Sequelize.ARRAY(Sequelize.JSON),
             defaultValue: []
         }
     }, {
         getterMethods: {
             total: function () {
                 return this.productList.reduce(function (a, b) {
                     return b.productPrice * b.productQty + a;
                 }, 0);
             }
         }
     });

     // Katie review: let's make a function that checks how old the order is and delete it after 2 years. Let's also at some point figure out whether to link this by email or what. maybe a pivot table and link to users based on email? or userId?
 };
