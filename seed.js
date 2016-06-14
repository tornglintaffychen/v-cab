var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Order = db.model('order');
var Review = db.model('review');
var Category = db.model('category');
var OrderProduct = db.model('OrderProduct')
var Promise = require('sequelize').Promise;

//utlitity function
function generateRandomNum(min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
}



function generateOrderProdArray(products) {
	let prodArray = [];
	for (var i = 0; i < 3; i++) {
		let prodIdx = generateRandomNum(0,products.length);
		//create list of random products
		let randomProduct = {
			product:products[prodIdx],
			orderInfo: {
				price:products[prodIdx].price,
				quantity:generateRandomNum(1,20)
			}
		}
		prodArray.push(randomProduct);
	}
	return prodArray;
}

function getData(promResponse) {
	return JSON.stringify(promResponse);
}

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
        categories: ["+O","full body"]
    }, {
        title: 'Lorimited Edition',
        inventory: 6,
        photoUrl: "images/default.jpg",
        price: 79.99,
        returnable: false,
        description: 'A playful O+ sourced from Jamaica. The Lorimited Edition is is only available to one distributor at a time - we have been lucky enough to acquire seven liters of this highly in-demand product. Limited one purchase per person. Do NOT miss out on this bold, in-your-face drink. It may be hard to pin down, but nothing can compete. +O premium rare limited highly-rated',
        categories: [
            "espresso", "spicy", "dry"
        ]

    }, {
        title: 'The Taff',
        inventory: 8,
        photoUrl: "images/default.jpg",
        price: 42.30,
        returnable: false,
        description: 'What can we say about this? Known to some as Tong-Lin, The Taff is a compelling product that leaves you dazed. The complexity comes from the intriguing varity between releases.',
        categories: [ "B", "vegan", "espresso"]
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
    // }, { //breaking my seed
    //     text: 'beutiful. :)',
    //     rating: 4,
    //     userId: 2,
    //     productId: 4
    }, {
        text: 'bad stuff. it serves no purpose',
        rating: 2,
        userId: 7,
        productId: 1
    }]
}


db.sync({
        force: true
    })
		//CREATE USERS
    .then(function () {
        console.log("Dropped old data, now inserting data");
				console.log("Creating users");
				return User.bulkCreate(data['users']);
    })
		//CREATE CATEGORIES
		.then(function () {
			console.log("Creating categories");
			return Category.bulkCreate(data['categories']);
		})
		//CREATE PRODUCTS
		.then(function (createdCategories) {
			console.log("Creating products");

			return	Category.findAll()
			.then((foundCategories) => {
				var createProducts = data['products'].map((product) => {
					//get the official category info for the attached categories
					product.categories = foundCategories.filter((cat) => {
						return product.categories.includes(cat.title);
					})
					return Product.create(product)
					.then((createdProduct) => {
						//add categories to product
						return createdProduct.addCategories(product.categories)
					})
				})
				return Promise.all(createProducts);
			})

		})
		// CREATE ORDERS
		.then(function () {
			return	Order.bulkCreate(data['orders'])
		})
		//TODO: Connect products to Orders
		.then(function(){
			return Product.findAll()
			.then(function (createdProducts) {
					return	Order.findAll()
					.then(function (createdOrders) {
						createdOrders.forEach((order)=>{
							let prodOrdersArray = generateOrderProdArray(createdProducts);
							return Promise.all(
								prodOrdersArray.map((product) => {
									return order.addProduct(product.product, product.orderInfo)
								}))
						})
					});
				})

    })
		// CREATE REVIEWS
    .then(function () {
			console.log("Creating reviews");
				return Review.bulkCreate(data['reviews']);

    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
