'use strict';
var router = require('express').Router();

var rootPath = '../../../';
var User = require(rootPath + 'db').User;

module.exports = router;

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

router.post('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .then(function (foundUser) {
            foundUser.update(req.body)
        })
        .then(function (edited) {
            res.json(edited)
        })
        .catch(next)
})
