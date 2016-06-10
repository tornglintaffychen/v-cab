var express = require('express');
var router = express.Router();

var rootPath = '../../../';
var Order = require(rootPath + 'db').Order;
var OrderProduct = require(rootPath + 'db').OrderProduct;

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
    Order.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (order) {
            res.json(order);
        })
        .catch(next);
});

router.post('/', function (req, res, next) {
    Order.create(req.body)
        .then(function (order) {
            res.json(order)
        })
        .catch(next);
});

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
    .then(function(product){
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
