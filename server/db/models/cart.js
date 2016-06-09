'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {
    db.define('OrderProduct', {
        orderId: {
            type: Sequelize.INTEGER

        },
        productId: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        }
    });
};
