var express = requrie('express');
var router = express.Router();

var rootPath = '../../../';
var Product = require(rootPath + 'db').Product;
var Review = require(rootPath + 'db').Review;

// category too, because req.query
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

// find all reviews a specific product has
// we should be able to tuse this route to get the stars and avg stars too?
router.get('/:id/reviews', function (req, res, next) {
    Product.findOne({
        where: {
            id: req.params.id
        },
        include: Review
    })
})

module.exports = router;
