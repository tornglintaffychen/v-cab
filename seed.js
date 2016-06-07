/* As of 6/7/16, this seed file creates entries for each model, as well as creating entries that are based solely on the object-model relationships. */

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Order = db.model('order');
var Review = db.model('review');
var Promise = require('sequelize').Promise;

var seedUsers = function() {
    //  currently the seed generates 7 users (including 2 admins)

    var users = [{
        firstName: 'Grace',
        lastName: 'Hopper',
        email: 'grace@hopper.org',
        password: '123'
    }, {
        firstName: 'Barak',
        lastName: 'Obama',
        address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
        email: 'obama@gmail.com',
        password: 'potus',
        isAdmin: true
    }, {
        firstName: 'Kanaya',
        lastName: 'Maryam',
        email: 'grim@aux.troll',
        password: '613'
    }, {
        firstName: 'K',
        lastName: 'B',
        email: 'kbuechner@gmail.com',
        password: '7777'
    }, {
        firstName: 'Alucard',
        lastName: 'Hellsing',
        email: 'undead@vampire.horse',
        password: 'dracula'
    }, {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'batman@gotham.gov',
        password: 'batman'
    }, {
        firstName: 'asdf',
        lastname: 'jkl',
        email: 'qw@er.ty',
        password: 'yiop',
        isAdmin: true,
    }];



    var creatingUsers = users.map(function(userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};
var seedProducts = function() {
    var numofProj = 4;
    //this means that whenever we seed the DB we can assume the IDs are 1-4. increment this when you add to the seed!

    var products = [{
            title: 'KBuechs',
            //            year: '1982'
            description: 'Basic, unsubtle, and straightforward. Almost overwhelmingly fruity with the lingering bitterness characteristic of the 1982 East Coast vintages. Not an award-winner and definitely past its prime, but at this price-point and high alcohol volume, who can complaining? Pair with late-night pizza, cheap beer, and anything deep fried.',
            categories: ['-O', 'smoked', 'spiked', 'inexpensive'],
            quantity: 47,
            photoUrl: "images/kbuechs.jpg",
            price: 1.50,
            returnable: true,
        }, {
            title: 'Lorimited Edition',
            //            year: null,
            description: 'A playful O+ sourced from Jamaica. The Lorimited Edition is is only available to one distributor at a time - we have been lucky enough to acquire seven liters of this highly in-demand product. Limited one purchase per person. Do NOT miss out on this bold, in-your-face drink. It may be hard to pin down, but nothing can compete.',
            categories: ['+O', 'premium'
                'rare', 'limited', 'highly-rated'
            ],
            quantity: 6,
            photoUrl: "images/default.jpg",
            price: 79.99,
            returnable: false
        }, {
            title: 'The Taff',
            //            year: null,
            description: 'What can we say about this? Known to some as Tong-Lin, The Taff is a compelling product that leaves you dazed. The complexity comes from the intriguing varity between releases.'
            categories: ['stylish'],
            quantity: 8,
            photoUrl: "images/default.jpg",
            price: 42.30,
            returnable: false
        }

    ];
    var creatingProducts = products.map(function(productObj) {
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);
}
var seedOrders = function() {
    var orders = [{
        status: 'processing',
        productList: [{
            productId: 1,
            productPrice: 1.50
        }, {
            productId: 2,
            productPrice: 8.75
        }],
        userId: 1

    }, {
        status: 'returnProcessing',
        productList: [{
            productId: 1,
            productPrice: 1.50
        }, {
            productId: 1,
            productPrice: 1.50
        }],
        userId: 2
    }];

    var creatingOrders = orders.map(function(orderObj) {
        return Order.create(orderObj);
    });

    return Promise.all(creatingOrders);
}

var seedReviews = function() {
    var reviews = [{
        text: 'holy crap this was great',
        rating: 3,
        userId: 1,
        productId: 2

    }, {
        text: 'holy crap this was the BEST',
        rating: 5,
        userId: 1,
        productId: 1

    }, {
        text: 'holy crap this was the worst',
        rating: 1,
        userId: 2,
        productId: 1
    }];

    var creatingReviews = reviews.map(function(reviewObj) {
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews);
}

//REVIEW:Lori: Is this consecutive because of dependencies?
db.sync({
        force: true
    })
    .then(function() {
        return seedUsers();
    })
    .then(function() {
        return seedProducts();
    })
    .then(function() {
        return seedOrders();
    })
    .then(function() {
        return seedReviews();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0); //REVIEW: Lori: Can you teach me what this line does
    })
    .catch(function(err) {
        console.error(err);
        process.kill(1);
    });
