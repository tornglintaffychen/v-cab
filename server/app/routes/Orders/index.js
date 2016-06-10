var express = require('express');
var router = express.Router();

var rootPath = '../../../';
var User = require(rootPath + 'db').User;
var Order = require(rootPath + 'db').Order;
var OrderProduct = require(rootPath + 'db').OrderProduct;
var chalk = require('chalk')
    // Only admins
router.get('/', function (req, res, next) {
    Order.findAll({
            where: req.query
        })
        .then(function (orders) {
            res.json(orders);
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    OrderProduct.findOne({
            where: {
                orderId: req.params.id
            }
        })
        .then(function (order) {
            console.log(chalk.yellow(order))
            res.json(order);
        })
        .catch(next);
});

// tc-bk: create a new orderId, put product info to the OrderProduct table
// not sure how to keep track the userId, unlogged in users yet
// router.post('/', function (req, res, next) {
//     // tc: assume logged in nothing in a cart
//     Order.create({
//             // tc-bk: is req.session.cookie working?
//             userId: req.user.id
//         })
//         .then(function (order) {
//             // tc-bk: check front end send the prodcut in correct format
//             return OrderProduct.create(req.body.product)
//         })
//         .then(function (createdOrder) {
//             res.json(createdOrder)
//         })
//         .catch(next);
// });


// add to cart for everyone
router.post('/addToCart', function (req, res, next) {
    console.log()
    if (req.user) {
        console.log(chalk.yellow("if req.user: ", req.user.id))
        return Order.findAll({
                where: {
                    userId: req.user.id,
                    status: 'inCart'
                }
            })
            .then(function (inCartOrder) {
                if (inCartOrder.length) {
                    OrderProduct.create({
                            orderId: inCartOrder[0].id,
                            productId: req.body.productId,
                            price: req.body.price,
                            title: req.body.title,
                            quantity: req.body.quantity
                        })
                        .then(function (order) {
                            req.session.order = order
                            res.json(order)
                        })
                        .catch(next)
                } else {
                    Order.create({
                            userId: req.user.id
                        })
                        .then(function (createdOrder) {
                            console.log(chalk.yellow("!inCartOrder", createdOrder))

                            OrderProduct.create({
                                orderId: createdOrder[0].id,
                                productId: req.body.productId,
                                price: req.body.price,
                                title: req.body.title,
                                quantity: req.body.quantity
                            })
                        })
                        .then(function (order) {
                            req.session.order = order
                            res.json(order)
                        })
                        .catch(next)
                }
            })
    } else {
        if (req.session.user && req.session.order) {
            console.dir(req.session)
            OrderProduct.create({
                    orderId: req.session.order.orderId,
                    productId: req.body.productId,
                    price: req.body.price,
                    title: req.body.title,
                    quantity: req.body.quantity
                })
                .then(function (order) {
                    res.json(order)
                })
                .catch(next)
        } else {
            console.log(chalk.red('no session'))
            User.create({
                    firstName: 'Bella',
                    lastName: 'Swan'
                })
                .then(function (createdUser) {
                    req.session.user = createdUser;
                    return Order.create({
                        userId: createdUser.id
                    })
                })
                .then(function (createdOrder) {
                    return OrderProduct.create({
                        orderId: createdOrder.id,
                        productId: req.body.productId,
                        price: req.body.price,
                        title: req.body.title,
                        quantity: req.body.quantity
                    })
                })
                .then(function (order) {
                    req.session.order = order
                    res.json(order)
                })
                .catch(next)
        }
    }
});

// this is only to add product to the OrderProduct table with exist id
// router.post('/:id/addToCart', function (req, res, next) {
//     OrderProduct.create({
//             orderId: req.params.id,
//             productId: req.body.productId,
//             price: req.body.price,
//             title: req.body.title,
//             quantity: req.body.quantiy
//         })
//         .then(function (item) {
//             res.json(item)
//         })
//         .catch(next)
// })

// edit one item in the shopping cart
router.put('/:id/editItem', function (req, res, next) {
    OrderProduct.update(req.body, {
            where: {
                orderId: req.params.id,
                productId: req.body.productId
            }
        })
        .then(function (updatedItem) {
            res.json(updatedItem)
        })
        .catch(next)
});

// delete one item in the shopping cart, interesting enought that it's a put route
router.put('/:id/deleteItem', function (req, res, next) {
    OrderProduct.destroy({
            where: {
                orderId: req.params.id,
                productId: req.body.productId
            }
        })
        .then(function (removed) {
            res.json(removed)
        })
});

router.get('/:id/products', function (req, res, next) {
    OrderProduct.findAll({
            where: {
                orderId: req.params.id
            }
        })
        .then(function (order) {
            res.json(order);
        })
        .catch(next)
});



// admin should be able to edit everything in the order
// users should be able to cancel order 30 mins limit
router.put('/:orderid/product/:productid', function (req, res, next) {
    OrderProduct.update(req.body, {
            where: {
                productId: req.params.productid,
                orderId: req.params.orderid
            }
        })
        .then(function (product) {
            return product.update(req.body.product);
        })
        .then(function (product) {
            res.json(product);
        })
        .catch(next);

});

// clear the shopping cart
router.delete('/:id', function (req, res, next) {
    console.log(req.params.id)
    Order.destroy({
            where: {
                id: req.params.id
            }
        })
        .catch(next);
});


module.exports = router;
