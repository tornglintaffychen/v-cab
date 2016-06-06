/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Order = db.model('order');
var Review = db.model('review');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            firstName: 'Grace',
            lastName: 'Hopper',
            email: 'grace@hopper.org',
            password: '123'
        },
        {
            firstName: 'Barak',
            lastName: 'Obama',
            address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
            email: 'obama@gmail.com',
            password: 'potus',
            isAdmin: true
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};
var seedProducts = function () {

    var products = [
        {
            title: 'KBuechs',
            categories: ['-O', 'smoked', 'spiked'],
            quantity: 7,
            photoUrl: "images/kbuechs.jpg",
            price: 1.50,
            returnable: true,
        },
        {
            title: 'Lorimited Edition',
            categories: ['+O', 'premium'],
            quantity: 6,
            photoUrl: "images/kbuechs.jpg",
            price: 8.75,
            returnable: false
        }
    ];
    var creatingProducts = products.map(function(productObj){
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);
}
var seedOrders = function (){
    var orders = [
        {
            status: 'processing', 
            productList: [{productId: 1, productPrice: 1.50}, {productId: 2, productPrice: 8.75}],
            userId: 1

        },
        {
            status: 'returnProcessing',
            productList: [{productId: 1, productPrice: 1.50}, {productId: 1, productPrice: 1.50}],
            userId: 2
        }
    ];

    var creatingOrders = orders.map(function(orderObj){
        return Order.create(orderObj);
    });
    
    return Promise.all(creatingOrders);
}

var seedReviews = function (){
    var reviews = [
        {
            text: 'holy crap this was great', 
            rating: 3,
            userId: 1,
            productId: 2

        },
        {
            text: 'holy crap this was the BEST', 
            rating: 5,
            userId: 1,
            productId: 1

        },
        {
            text: 'holy crap this was the worst', 
            rating: 1,
            userId: 2,
            productId: 1
        }
    ];

    var creatingReviews = reviews.map(function(reviewObj){
        return Review.create(reviewObj);
    });
    
    return Promise.all(creatingReviews);
}

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedProducts();
    })
    .then(function () {
        return seedOrders();
    })
    .then(function () {
        return seedReviews();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
