var express = require('express');
var router = express.Router();

var rootPath = '../../../';
var Order = require(rootPath + 'db').Order;

// Only admins
router.get('/', function(req, res, next) {
    Order.findAll({
            where: req.query
        })
        .then(function(orders) {
            res.json(orders)
        })
        .catch(next);
})

router.get('/:id', function(req, res, next) {
    Order.findById(req.params.id)
        .then(function(order) {
            res.json(order)
        })
        .catch(next);
})

// admin should be able to edit everything in the order
// users should be able to cancel order 30 mins limit
router.put('/:id', function(req, res, next) {
    Order.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .catch(next);
})
module.exports = router;
