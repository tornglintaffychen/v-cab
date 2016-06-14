'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {
    db.define('OrderProduct', {
        title:{
            type: Sequelize.STRING 
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        }
    });
};
