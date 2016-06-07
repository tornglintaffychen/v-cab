'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('order', {
        status: {
            type: Sequelize.ENUM('received', 'processing', 'shipped', 'delivered', 'returnProcessing', 'returned'),
            defaultValue: 'received'
        },
        //UPDTED IN OTHER BRANCH
        // returnable: {
        //     type: Sequelize.BOOLEAN,
        //     defaultValue: false
        // },
        purchaseDate: {
            type: Sequelize.DATE
        },
        //UPDTED IN OTHER BRANCH
        productList: {
            // [{productId: id, productPrice: price}, {productId: id, productPrice: price}]
            type: Sequelize.ARRAY(Sequelize.JSON),
            allowNull: false
        }
    }, {
        getterMethods: {
            total: function () {
                return this.productList.reduce(function (a, b) {
                  // console.log(a, b);
                    return b.productPrice+a;
                },0);
            }
        }
    });
};
