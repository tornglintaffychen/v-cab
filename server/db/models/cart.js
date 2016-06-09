'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {
    db.define('OrderProduct', {
        quantity: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        }
    });
};
