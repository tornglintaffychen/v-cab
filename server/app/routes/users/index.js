'use strict';
var router = require('express').Router();

var rootPath = '../../../';
var User = require(rootPath + 'db').User;
var Review = require(rootPath + 'db').Review;
var Order = require(rootPath + 'db').Order;

// only admin users can see all users
router.get('/', function (req, res, next) {
    User.findAll({})
        .then(function (users) {
            res.json(users)
        })
        .catch(next)
})

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .then(function (user) {
            res.json(user)
        })
        .catch(next)
})

// either registering or just shop as a guest, we need their info no matter what
router.post('/', function (req, res, next) {
    User.create(req.body)
        .then(function (added) {
            res.json(added)
        })
})

router.put('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .then(function (foundUser) {
            foundUser.update(req.body)
        })
        .then(function (edited) {
            res.json(edited)
        })
        .catch(next)
})

// find all reviews a specific user has written
router.get('/:id/reviews', function (req, res, next) {
    User.findOne({
            where: {
                id: req.params.id
            },
            include: Review
        })
        .catch(next)
})

// find all order of a specific user
router.get('/:id/orders', function (req, res, next) {
    User.findOne({
            where: {
                id: req.params.id
            },
            include: Order
        })
        .catch(next)
})

module.exports = router;
