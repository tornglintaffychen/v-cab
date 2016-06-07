'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db) {

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
            // [{productId: id, productPrice: price, productIdQty: num}, {productId: id, productPrice: price, productIdQty: num}]
            // Katie review: would it be better to have a productIdQty or list multiple copies of the same product? I feel like it'll be easier in the future for users to edit within their cart.
            type: Sequelize.ARRAY(Sequelize.JSON)
            defaultValue: []
                // Katie review: let's figure out a way to clean up productList. maybe make a new model? the .JSON seems a bit awkward to add to the db? if nothing else, productIdQty should be required but default to 1
        }
    }, {
        getterMethods: {
            total: function() {
                // Katie review: unclear how this works. what are we reducing? and we need to be able to parse the JSON within here to access the product price. Also, let's add b.productPrice * productIdQty
                return this.products.reduce(function(a, b) {
                    return b.productPrice + a;
                }, 0);
            }
        }
    });

    // Katie review: let's make a function that checks how old the order is and delete it after 2 years. Let's also at some point figure out whether to link this by email or what. maybe a pivot table and link to users based on email? or userId?
};
