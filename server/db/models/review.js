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
        //why are we limiting the review so much? unless 23 and 250 words. 23 seems a weird minimum
        //we also really should implement a swear filter (or general filter). should that be an instance or class method? let's implement a *word* minimum instead of a character minimum (i.e., include 5 spaces) and disallow line breaks. again, would this be a method in here, or is there a better way to build this?
      },
      rating:{
        type: Sequelize.INTEGER,
        validate:{
          min: 1, max: 5,
        }
      },
      //should we require an email? maybe not publish it but to hold SOME accountability for commenting, i.e. confirming that they made the comment, and banning someone if they consistently post vulgar or inappropriate information, spam, or obvious self-promotion
      //also we should require a self-assigned name for unregistered user reviews
    })

}
//looks good. very dry code, don't see a point in breaking things out more