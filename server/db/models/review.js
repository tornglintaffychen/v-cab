'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('review', {
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        rating: {
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
                max: 5,
            }
        }
    })
}
