var express = require('express');
var router = express.Router();

var rootPath = '../../../';
var Order = require(rootPath + 'db').Order;
var OrderProduct = require(rootPath + 'db').OrderProduct;
var chalk = require('chalk')
    // Only admins
router.get('/', function (req, res, next) {
   console.log("USERTEST", req.session);
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

// tc: create a new orderId, put product info to the OrderProduct table
router.post('/', function (req, res, next) {
    console.log(chalk.yellow(req.user));
        // tc: assume logged in nothing in a cart
    Order.create({
            // tc-bk: is req.session.cookie working?
            userId: req.session.cookie.userId
        })
        .then(function (order) {
            // tc-bk: check front end send the prodcut in correct format
            return OrderProduct.create(req.body.product)
        })
        .then(function (createdOrder) {
            res.json(createdOrder)
        })
        .catch(next);
});

// tc: this is only to add product to the OrderProduct table with exist id
router.post('/:id/addToCart', function (req, res, next) {
    OrderProduct.create({
            orderId: req.params.id,
            productId: req.body.productId,
            price: req.body.price,
            title: req.body.title,
            quantity: req.body.quantiy
        })
        .then(function (item) {
            res.json(item)
        })
        .catch(next)
})

// tc: edit one item in the shopping cart
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

// tc: delete one item in the shopping cart, interesting enought that it's a put route
router.put('/:id/deleteItem', function (req, res, next) {
    OrderProduct.destroy({
        where: {
            orderId: req.params.id,
            productId: req.body.productId
        }
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

router.delete('/product/:id', function (req, res, next) {
    OrderProduct.destroy({
            where: {
                productId: req.params.id
            }
        })
        .then(function (product) {
            res.json(product);
        })
        .catch(next);

});


module.exports = router;
