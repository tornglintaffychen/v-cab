'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var Reviews = require('./review');


module.exports = function (db) {
    // Katie review:let's make sure all of these are editable by the admin

    db.define('product', {
        title: {
            type: Sequelize.STRING
        },
        categories: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        // Katie review: can we do an ENUM? that might be handy. also, let's not allow any of these to be null
        quantity: {
            type: Sequelize.INTEGER
        },

        // Katie review: let's change the name of this, otherwise we'll have a collision with the order table, which also includes quantities. maybe something like onHand quantity, and default value is 0?

        photoUrl: {
            type: Sequelize.STRING,
            defaultValue: "/images/default.jpg"
        },
        // Katie review: this is fine but we need to make a /images folder somewhere
        price: {
            type: Sequelize.FLOAT
        },
<<<<<<< HEAD
=======
        // Katie review: not sure if float is correct. maybe we could have 'dollars' and 'cents' within price? that might make totalling things easier? we DEFINITELY shouldn't allow null here
>>>>>>> models
        returnable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: Sequelize.TEXT
        }
        // Katie review: should have a min/max word count
    }, {
        // get average rating
        getterMethods: {
            starRating: function () {
                var currProductId = this.id;
                // Katie review: we should include a bit where we round up/down to the nearest half star, or at least limit it to like, 3.2 or somesuch, otherwise we'll get a repeating number eventually
                return Reviews.findAll({
                    where: {
                        productId: currProductId
                    }
                }).then(function (ratings) {
                    var length = ratings.length;
                    var average = ratings.reduce(function (a, b) {
                        return a + b;
                    });
                    return average / length;
                    // Katie review: i assume the limit to one deicmal point would be here

                });
            }
        }
    });
}
