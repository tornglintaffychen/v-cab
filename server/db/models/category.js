'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {
    db.define('category', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
						// primaryKey:true
        }
    });
};
