'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var Reviews = require('./review');

<<<<<<< HEAD
module.exports = function (db) {
//let's make sure all of these are editable by the admin
=======
module.exports = function(db) {

>>>>>>> 3cc376197d6bfe6b6b67314d85205aff66260413
    db.define('product', {
        title: {
            type: Sequelize.STRING
        },
        categories: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
//can we do an ENUM? that might be handy. also, let's not allow any of these to be null
        quantity: {
            type: Sequelize.INTEGER
        },
<<<<<<< HEAD
//let's change the name of this, otherwise we'll have a collision with the order table, which also includes quantities. maybe something like onHand quantity, and default value is 0?
=======
>>>>>>> 3cc376197d6bfe6b6b67314d85205aff66260413
        photoUrl: {
            type: Sequelize.STRING,
            defaultValue: "/images/default.jpg"
        },
//this is fine but we need to make a /images folder somewhere
        price: {
            type: Sequelize.FLOAT
        },
<<<<<<< HEAD
//not sure if float is correct. maybe we could have 'dollars' and 'cents' within price? that might make totalling things easier? we DEFINITELY shouldn't allow null here
        returnable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: Sequelize.TEXT
=======
        //REVIEW: Lori: Great catch Katie! 
        returnable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
>>>>>>> 3cc376197d6bfe6b6b67314d85205aff66260413
        }
//should have a min/max word count
    }, {
        //get average rating
        getterMethods: {
            starRating: function() {
                var currProductId = this.id;
//we should include a bit where we round up/down to the nearest half star, or at least limit it to like, 3.2 or somesuch, otherwise we'll get a repeating number eventually
                return Reviews.findAll({
                    where: {
                        productId: currProductId
                    }
                }).then(function (ratings) {
                    var length = ratings.length;
<<<<<<< HEAD
                    var average = ratings.reduce(function (a, b) {
                        return a + b;
                    });
                    return average / length;
                    //i assume the limit to one deicmal point would be here
=======
                    var average = ratings.reduce(function(a, b) {
                        return a + b;
                    });
                    return average / length;
>>>>>>> 3cc376197d6bfe6b6b67314d85205aff66260413
                });
            }
        }
    });
}
