var express = requrie('express');
var router = express.Router();

var rootPath = '../../../';
var Product = require(rootPath + 'db').Product;
var Review = require(rootPath + 'db').Review;

// category too, because req.query
router.get('/', function (req, res, next) {
    Product.findAll({
            // where: {
            //     req.query
            // }
            //contains*sv
            where: {
                categories: {
                    $contains: req.query
                }
            }
        })
        .then(function (products) {
            if (products) {
                res.json(products);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch(next);
});

//FindOne by ID
router.get('/:id', function (req, res, next) {
    Product.findById(req.params.id)
        .then(function (product) {
            if (product) {
                res.json(product);
            } else {
                res.status(404).send("Not Found");
            }

        })
        .catch(next);
});
//Find similiar products
router.get('/search', function (req, res, next) {
    Product.findAll({
            where: {
                description: {
                    $like: '%' + req.query.name + '%'
                }
            },
            limit: 20
        })
        //sending data back*sv
        .then(function (products) {
            if (products) {
                res.json(products);
            } else {
                res.status(404).send("No Similiar Products Found");
            }
        });
});

//Can we just include in the find one?
// find all reviews a specific product has
router.get('/:id/reviews', function (req, res, next) {
    Product.findOne({
            where: {
                id: req.params.id
            },
            include: Review
        })
        //sending data back*sv
        .then(function (product) {
            if (product) {
                res.json(product)
            } else {
                res.status(404).send("No Reviews Found");
            }
        })
        //checking invalid id
        .catch(function (err) {
            res.status(500).send("Invalid Id");
        });
});

module.exports = router;
