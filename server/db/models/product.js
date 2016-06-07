'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var Reviews = require('./review');


module.exports = function (db) {
    // Katie review:let's make sure all of these are editable by the admin

    db.define('product', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categories: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false,
            defaultValue: "uncategorized"
        },
        inventory: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        photoUrl: {
            type: Sequelize.STRING,
            defaultValue: "/images/default.jpg"
        },
        // TODO: validation for only 2 digits after . (use getterMethods maybe)
        price: {
            type: Sequelize.FLOAT
        },
        returnable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: Sequelize.TEXT,
            validate: {
                len: [25, 250] //only allow values with length between 25 and 250
            }
        }
    }, {
        // get average rating
        getterMethods: {
            starRating: function () {
                var currProductId = this.id;
                return Reviews.findAll({
                    where: {
                        productId: currProductId
                    }
                }).then(function (ratings) {
                    var length = ratings.length;
                    var average = ratings.reduce(function (a, b) {
                        return a + b;
                    });
                    return (average / length).toFixed(1);
                });
            }
        }
    });
}
