var express = require('express');
var router = express.Router();

var rootPath = '../../../';
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

// tc: create a new orderId, put product info to the OrderProduct table
router.post('/', function (req, res, next) {
    console.log(chalk.yellow(req.body))
    Order.create({
            userId: req.session.userId
        })
        .then(function (order) {
            // tc: we can make req.body just like the object that we need to pass in the OrderProduct.create(), so we don't need to write this object here (?)
            return OrderProduct.create(req.body.product)
        })
        .then(function (createdOrder) {
            res.json(createdOrder)
        })
        .catch(next);
});

// tc: this is only to add product to the OrderProduct table with exist id

router.get('/:id/products', function (req, res, next) {
    OrderProduct.findAll({
            where: {
                orderId: req.params.id
            }
        })
        .then(function (order) {
            res.json(order);
        });
});

router.put('/:id', function (req, res, next) {

});

// admin should be able to edit everything in the order
// users should be able to cancel order 30 mins limit
router.put('/:orderid/product/:productid', function (req, res, next) {
    OrderProduct.findOne({
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
// tc: instead of create and update, we use findOrCreate?
// maybe not.
// router.post('/:id', function (req, res, next) {
//     Order.findOrCreate({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(function (order) {
//             Order.update(req.body, {
//                 where: {
//                     id: order.id
//                 }
//             })
//         })
// })

module.exports = router;
