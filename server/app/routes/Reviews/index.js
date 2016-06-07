'use strict';
var router = require('express').Router();

var rootPath = '../../../';
var Review = require(rootPath + 'db').Review;



// only admin users can see all reviews
router.get('/', function (req, res, next) {
    Review.findAll({})
        .then(function (reviews) {
            res.json(reviews)
        })
        .catch(next)
})

router.get('/:id', function (req, res, next) {
    Review.findById(req.params.id)
        .then(function (review) {
            res.json(review)
        })
        .catch(next)
})

router.post('/', function (req, res, next) {
    Review.create(req.body)
        .then(function (added) {
            res.json(added)
        })
})

router.put('/:id', function (req, res, next) {
    Review.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .catch(next);
})

module.exports = router;
