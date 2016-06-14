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
        password: '123',
        isAdmin: true
    }, {
        firstName: 'Barak',
        lastName: 'Obama',
        address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
        email: 'obama@gmail.com',
        password: 'potus'
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
        firstName: 'Taffy',
        lastName: 'Chen',
        email: 't@chen.com',
        password: '123',
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
<<<<<<< HEAD
        id: 1,
        title: 'KBuechs',
        inventory: 47,
        photoUrl: "images/default.jpg",
=======
        title: 'KBuechs',
        inventory: 47,
        photoUrl: "images/brown.jpg",
>>>>>>> master
        price: 1.50,
        returnable: true,
        description: 'Basic, unsubtle, and straightforward. Almost overwhelmingly fruity with the lingering bitterness characteristic of the 1982 East Coast vintages. Not an award-winner and definitely past its prime, but at this price-point and high alcohol volume, who can complaining? Pair with late-night pizza, cheap beer, and anything deep fried.',
    }, {
        id: 2,
        title: 'Lorimited Edition',
        inventory: 6,
        photoUrl: "images/pure.jpg",
        price: 79.99,
        returnable: false,
        description: 'A playful O+ sourced from Jamaica. The Lorimited Edition is is only available to one distributor at a time - we have been lucky enough to acquire seven liters of this highly in-demand product. Limited one purchase per person. Do NOT miss out on this bold, in-your-face drink. It may be hard to pin down, but nothing can compete.',
    }, {
        id: 3,
        title: 'The Taff',
        inventory: 8,
        photoUrl: "images/wine.jpg",
        price: 42.30,
        returnable: false,
        description: 'What can we say about this? Known to some as Tong-Lin, The Taff is a compelling product that leaves you dazed. The complexity comes from the intriguing varity between releases.',
    }, {
<<<<<<< HEAD
        id: 4,
        title: 'Samantharama',
        inventory: 19,
        photoUrl: "images/default.jpg",
=======
        title: 'Samantharama',
        inventory: 19,
        photoUrl: "images/sam.jpg",
>>>>>>> master
        price: 16.66,
        returnable: false,
        description: 'Frankly, we love this new offering. Our distributors have found something crisp and refreshing that is bright on the palate without the acidity normally associated with ',
    }, {
<<<<<<< HEAD
        id: 5,
        title: 'Healthy Choice',
        inventory: 10,
        photoUrl: "images/default.jpg",
        price: 200,
        returnable: false,
        description: 'This is a very healthy blood from a very healthy vegan lady.',
=======
        title: 'Healthy Choice',
        inventory: 10,
        photoUrl: "images/healthy.jpg",
        price: 200,
        returnable: false,
        description: 'This is a very healthy blood from a very healthy vegan lady.',
    }, {
        title: "Sweet Caroline",
        inventory: 1913,
        photoUrl: "images/pink.jpg",
        price: 20.04,
        returnable: false,
        description: "The official blood of the Boston Red Sox! Our first entry in our new line of MLB-branded offerings, the Sweet Caroline has proven a fast favorite in our New England market. No Green Monster here - just a smooth, full-bodied, extremely drinkable beverage, with an impressive depth for such a young offering. Now shipping in a collectible vacuum-sealed package emblazoned with the famous Red Sox logo."
    }, {
        title: "American Beauty",
        inventory: 20,
        photoUrl: "images/beauty.jpg",
        price: 17.76,
        returnable: true,
        description: "Just in time for the Fourth of July, this is a hearty blend of Midwestern varietals. Show your patriotism by sipping this rich drink while watching Independence Day fireworks! Seasonal; quantities limited."
    }, {
        title: "Morning Glory",
        inventory: 75,
        photoUrl: "images/glory.jpg",
        price: 59.99,
        returnable: false,
        description: "What’s the story, Morning Glory? Whatever your story, if you’re looking for an exquisite blood for a special occasion, a romantic evening, or even a just-for-you indulgence, Morning Glory has a crystalline complexity. This unique blood is from a chimeric source - a genetic variation that results in two mingled blood types. A truly special offering, only from V-Cab."
    }, {
        title: "Pineapple Express",
        inventory: 420,
        photoUrl: "images/pineapple.jpg",
        price: 19.99,
        returnable: false,
        description: "All aboard! This is a fun, funky blood perfect for lazy afternoons at the beach and casual get-togethers. A uniquely smoky flavor. "
    }, {
        title: "Solstice",
        inventory: 12,
        photoUrl: "images/dark.jpg",
        price: 899.99,
        returnable: false,
        description: "Solstice is collected once a year, on the summer solstice.This wine is available for pre - order in HIGHLY LIMITED quantities."
    }, {
        title: "Jack and Jill",
        inventory: 1340,
        photoUrl: "images/dull.jpg",
        price: 7.99,
        returnable: true,
        description: "An extremely young vintage. Fresh, bright, and juicy, with a lingering sweetness. Due to overstock, this blood is highly discounted - an incredible value!"
    }, {
        title: "Mad Martha",
        inventory: 0,
        photoUrl: "/images/empty.jpg",
        price: 14.99,
        returnable: false,
        description: "Out Of Stock"
>>>>>>> master
    }],
    orders: [{
        userId: 1
    }, {
        userId: 2
    }, {
        userId: 3
    }],
    reviews: [{
        text: 'holy crap this was great the BEST BEST BEST BEST BEST BEST BEST BEST BEST',
        rating: 3,
        userId: 2,
        productId: 2

    }, {
        text: 'something indescribable',
        rating: 5,
        userId: 4,
        productId: 3

    }, {
        text: 'the worst absolutely the worst more than bad terrible',
        rating: 1,
        userId: 5,
        productId: 1
    }, {
        text: 'beutiful. :)',
        rating: 4,
        userId: 2,
        productId: 4
    }, {
        text: 'bad stuff. it serves no purpose',
        rating: 2,
        userId: 7,
        productId: 1
    }]
}

// function catId() {
//     return Math.floor(Math.random() * (11 - 1 + 1)) + 1;
// }

function pId() {
<<<<<<< HEAD
    return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
=======
    return Math.floor(Math.random() * (12 - 1 + 1)) + 1;
>>>>>>> master
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
                .then(function (category) {
                    // shows error because we call the fnc inside the array
                    // but seed succsss
<<<<<<< HEAD
                    category.addProducts([pId(), pId(), pId()])
=======
                    var id1 = pId();
                    var id2 = pId();
                    var id3 = pId();
                    category.addProducts([id1, id2, id3])
>>>>>>> master
                })
        })
        return Promise.all(createCategories)
    })
    .then(function () {

        var createProducts = data['products'].map(function (productObj) {
            return Product.create(productObj)
                // .then(function (product) {
                // shows error because we call the fnc inside the array
                // but seed succsss
                //     product.addCategories([catId(), catId(), catId()])
                // })
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
                    OrderProduct.create({
                        orderId: order.id,
                        productId: 4,
                        title: 'Healthy Choice',
                        price: 200,
                        quantity: 9
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
