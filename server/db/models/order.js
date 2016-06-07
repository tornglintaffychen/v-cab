'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('order', {
        status: {
            type: Sequelize.ENUM('inCart', 'received', 'processing', 'shipped', 'delivered', 'returnProcessing', 'returned'),
            defaultValue: 'inCart'
        },
        returnable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        purchaseDate: {
            type: Sequelize.DATE
        },
        productList: {
            // [{productId: id, productPrice: price, productIdQty: num}, {productId: id, productPrice: price, productIdQty: num}]
            type: Sequelize.ARRAY(Sequelize.JSON)
            defaultValue: []
        }
    }, {
        getterMethods: {
            total: function () {
                return this.products.reduce(function (a, b) {
                    return b.productPrice + a;
                }, 0);
            }
        }
    });
};
