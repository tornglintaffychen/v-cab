'use strict';
var router = require('express').Router();
var rootPath = '../../../';
var Review = require(rootPath + 'db').Review;


// only admin users can see all reviews
router.get('/', function (req, res, next) {
    Review.findAll({})
        .then(function (reviews) {
            res.json(reviews);
        })
        .catch(next);
});

//find by id
router.get('/:id', function (req, res, next) {
    Review.findById(req.params.id)
        .then(function (review) {
            //check to be sure theres a book w that id*sv
            if (review) {
                res.json(review);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch(next);
});

//create review*sv
router.post('/', function (req, res, next) {
    Review.create(req.body)
        .then(function (added) {
            res.json(added);
        })
        .catch(function (err) {
            res.status(500).send("Invalid Input");
        });
});

//delete review*sv
router.delete('/:id', function (req, res, next) {
    Review.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function (review) {
            if (review) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(500).send("Invalid Id");
        });
});

//update
router.put('/:id', function (req, res, next) {
    Review.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        //send status if it's an invalid id
        .catch(function (err) {
            res.status(500).send("Invalid Id");
        });
});

module.exports = router;
