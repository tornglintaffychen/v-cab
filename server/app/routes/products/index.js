var express = requrie('express');
var router = express.Router();

var rootPath = '../../../';
var Product = require(rootPath + 'db').Product;

router.get('/', function (req, res, next) {
    Product.findAll({
            where: {
                req.query
            }
        })
        .then(function (products) {
            res.json(products)
        })
        .catch(next);
})

router.get('/:id', function (req, res, next) {
    Product.findById(req.params.id)
        .then(function (product) {
            res.json(product)
        })
        .catch(next);
})

router.get('/search', function (req, res, next) {
    Product.findAll({
        where: {
            description: {
                $like: '%' + req.query.name + '%'
            }
        },
        limit: 20
    })
})

module.exports = router;
