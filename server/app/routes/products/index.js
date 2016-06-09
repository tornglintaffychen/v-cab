var express = require('express');
var router = express.Router();

var rootPath = '../../../';
var Product = require(rootPath + 'db').Product;
var Review = require(rootPath + 'db').Review;
var Category = require(rootPath + 'db').Category;

// category too, because req.query
router.get('/', function (req, res, next) {
    Product.findAll({
            where: req.query,
            include: [Category, Review]
        })
        .then(function (products) {
            if (!products.length) throw new Error('not found!')
            //EI: why is this logic necessary? what about products.length <= 0?
            // 404 indicates that this endpoint wasn't found, not that products couldn't be found, right?
            // plus, you've already got error-handling middleware in your routes/index.js
            if (products) {
                res.json(products);
            } else {
                // res.status(404).send("Not Found");
            }
        })
        .catch(next);
});

//FindOne by ID
router.get('/:id', function (req, res, next) {
    Product.findOne({
            where: {
                id: req.params.id
            },
            include: [Category, Review]
        })
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
                },
                include: [Category, Review]
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
        })
        .catch(next)
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
        .catch(next)
});

// EI: double route!
// //Can we just include in the find one?
// // find all reviews a specific product has
// router.get('/:id/reviews', function (req, res, next) {
//     Product.findOne({
//             where: {
//                 id: req.params.id
//             },
//             include: Review
//         })
//         //sending data back*sv
//         .then(function (product) {
//             if (product) {
//                 res.json(product)
//             } else {
//                 res.status(404).send("No Reviews Found");
//             }
//         })
//         .catch(next)
// });

module.exports = router;
