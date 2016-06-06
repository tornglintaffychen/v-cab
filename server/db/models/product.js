'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var Reviews = require('./review');

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
        photoUrl: {
            type: Sequelize.STRING,
            defaultValue: "/images/default.jpg"
        },
        price: {
            type: Sequelize.FLOAT
        },
        returnable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        //get average rating
        getterMethods: {
            starRating: function () {
                var currProductId = this.id;

                return Reviews.findAll({
                    where: {
                        productId: currProductId
                    }
                }).then(function(ratings) {
                    var length = ratings.length;
                    var average = ratings.reduce(function(a, b){
                        return a+b;
                    });
                    return average/length;
                });
            }
        }
    });
}
