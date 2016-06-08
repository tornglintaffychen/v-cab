'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {
	db.define('category', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};