'use strict';
var Sequelize = require('sequelize');
//YI: it might be too much to have a whole table for this if all it has is a title? might as well be an array of strings like you have on the order status 
module.exports = function (db) {
    db.define('category', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};
