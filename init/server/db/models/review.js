'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('review', {
      text:{
        type: Sequelize.TEXT,
        allowNull: false,
        validate:{
          len: [23, 250] //only allow values with length between 23 and 250
        }
      }
      rating:{
        type: Sequelize.INTEGER,
        validate:{
          min: 1, max: 5,
        }
      },

    })

}
