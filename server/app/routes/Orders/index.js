var express = require('express');
var router = express.Router();
var passport = require('passport');

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
            res.json(order);
        })
        .catch(next);
});

// add to cart for everyone, keep track of users,
router.post('/addToCart', function (req, res, next) {
    // user will be either req.user (logged in), or we create one and log her in
    var user = req.user ? Promise.resolve(req.user) :
        User.create({
            firstName: 'Bella',
            lastName: 'Swan'
        })
        .then(function (createdUser) {
            req.logIn(createdUser, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: createdUser.sanitize()
                });
            });
            return createdUser;
        })

    // then we use this user to check if she has orderId with inCart status, if yes, just add to OrderProduct
    user.then(createdUser => {
        Order.findAll({
                where: {
                    userId: createdUser.id,
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
                    // if not, create Order first then add to OrderProduct
                    Order.create({
                            userId: createdUser.id
                        })
                        .then(function (createdOrder) {
                            OrderProduct.create({
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
            })
    })
});

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
    Order.destroy({
            where: {
                id: req.params.id
            }
        })
        .catch(next);
});


module.exports = router;
