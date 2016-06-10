var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Order = db.model('order');
var Review = db.model('review');
var Category = db.model('category');
var OrderProduct = db.model('OrderProduct')
var Promise = require('sequelize').Promise;

var data = {
    users: [{
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
        lastName: 'jkl',
        email: 'qw@er.ty',
        password: 'yiop',
        isAdmin: true,
    }],
    categories: [{
        title: "+O"
    }, {
        title: "-O"
    }, {
        title: "A"
    }, {
        title: "B"
    }, {
        title: "vegan"
    }, {
        title: "espresso"
    }, {
        title: "spicy"
    }, {
        title: "dry"
    }, {
        title: "crisp"
    }, {
        title: "doubled"
    }, {
        title: "full body"
    }],
    products: [{
        title: 'KBuechs',
        inventory: 47,
        photoUrl: "images/kbuechs.jpg",
        price: 1.50,
        returnable: true,
        description: 'Basic, unsubtle, and straightforward. Almost overwhelmingly fruity with the lingering bitterness characteristic of the 1982 East Coast vintages. Not an award-winner and definitely past its prime, but at this price-point and high alcohol volume, who can complaining? Pair with late-night pizza, cheap beer, and anything deep fried. -O smoked spiked inexpensive',
        categories: [{
            title: "+O"
        }, {
            title: "full body"
        }]
    }, {
        title: 'Lorimited Edition',
        inventory: 6,
        photoUrl: "images/default.jpg",
        price: 79.99,
        returnable: false,
        description: 'A playful O+ sourced from Jamaica. The Lorimited Edition is is only available to one distributor at a time - we have been lucky enough to acquire seven liters of this highly in-demand product. Limited one purchase per person. Do NOT miss out on this bold, in-your-face drink. It may be hard to pin down, but nothing can compete. +O premium rare limited highly-rated',
        categories: [{
            title: "espresso"
        }, {
            title: "spicy"
        }, {
            title: "dry"
        }]

    }, {
        title: 'The Taff',
        inventory: 8,
        photoUrl: "images/default.jpg",
        price: 42.30,
        returnable: false,
        description: 'What can we say about this? Known to some as Tong-Lin, The Taff is a compelling product that leaves you dazed. The complexity comes from the intriguing varity between releases.',
        categories: [{
            title: "B"
        }, {
            title: "vegan"
        }, {
            title: "espresso"
        }]
    }],
    orders: [{
        userId: 1
    }, {
        userId: 2
    }],
    reviews: [{
        text: 'holy crap this was great the BEST BEST BEST BEST BEST BEST BEST BEST BEST',
        rating: 3,
        userId: 1,
        productId: 2

    }, {
        text: 'holy crap this was the BEST BEST BEST BEST BEST BEST BEST BEST',
        rating: 5,
        userId: 1,
        productId: 1

    }, {
        text: 'holy crap this was the worst the worst the worst the worst EVER EVER EVER EVER',
        rating: 1,
        userId: 2,
        productId: 1
    }]
}


db.sync({
        force: true
    })
    .then(function () {
        console.log("Dropped old data, now inserting data");
        var createUsers = data['users'].map(function (userObj) {
            return User.create(userObj)
        })
        return Promise.all(createUsers)
    })
    .then(function () {
        var createCategories = data['categories'].map(function (categoryObj) {
            return Category.create(categoryObj)
        })
        return Promise.all(createCategories)
    })
    .then(function () {
        var createProducts = data['products'].map(function (productObj) {
            return Product.create(productObj, {
                include: [Category]
            })
        });
        return Promise.all(createProducts);
    })
    .then(function () {
        var createOrders = data['orders'].map(function (orderObj) {
            return Order.create(orderObj)
                .then(function (order) {
                    OrderProduct.create({
                        orderId: order.id,
                        productId: 2,
                        title: 'Lorimited Edition',
                        price: 79.99,
                        quantity: 2
                    })
                    OrderProduct.create({
                        orderId: order.id,
                        productId: 3,
                        title: 'The Taff',
                        price: 42.30,
                        quantity: 1
                    })
                })
        })
        return Promise.all(createOrders);
    })
    .then(function () {
        var createReviews = data['reviews'].map(function (reviewObj) {
            return Review.create(reviewObj)
        })
        return Promise.all(createReviews);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
