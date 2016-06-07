'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('order', {
        status: {
            type: Sequelize.ENUM('received', 'processing', 'shipped', 'delivered', 'returnProcessing', 'returned', 'cancelled'),
            defaultValue: 'received'
        },
<<<<<<< HEAD
        //UPDTED IN OTHER BRANCH
        // returnable: {
        //     type: Sequelize.BOOLEAN,
        //     defaultValue: false
        // },
=======
>>>>>>> f99e10292f1c6ce67a0e0f6dda975c30c2fa642f
        purchaseDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
<<<<<<< HEAD
        //UPDTED IN OTHER BRANCH
=======
>>>>>>> f99e10292f1c6ce67a0e0f6dda975c30c2fa642f
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
