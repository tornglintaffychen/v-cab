'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('product', {
       title: {
            type: Sequelize.STRING
        },
        categories: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        photoURl: {
            type: Sequelize.STRING,
            defaultValue: "/images/default.jpg"
        },
        price: {
            type: Sequelize.INTEGER
        }
    });

};

