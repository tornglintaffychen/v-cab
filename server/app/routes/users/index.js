'use strict';

var router = require('express').Router();
var rootPath = '../../../';
var User = require(rootPath + 'db').User;
var Review = require(rootPath + 'db').Review;
var Order = require(rootPath + 'db').Order;
var parser = require('parse-address'); 
// only admin users can see all users
router.get('/', function (req, res, next) {
    User.findAll()
        .then(function (users) {
            res.json(users);
        })
        .catch(next);
});

// either registering or just shop as a guest, we need their info no matter what
router.post('/', function (req, res, next) {
    User.create(req.body)
        .then(function (added) {
            res.json(added);
        })
        .catch(next);
});

//update user
router.put('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .then(function (foundUser) {
            //check it exists*sv
            if (foundUser) {
                //didn't return*sv
                return foundUser.update(req.body);
            } else {
                res.status(404).send("Not Found");
                return;
            }
        })
        .then(function (edited) {
            res.json(edited);
        })
        .catch(next);
});
//combined*sv
//get one user, their order and reviews
router.get('/:id', function (req, res, next) {
    User.findOne({
            where: {
                id: req.params.id
            },
            include: Review,
            Order
        })
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch(next);
});


router.get('/address/:string', function(req, res, next) {
    var string = req.params.string;
    console.log("here", string)

    res.json(parser.parseLocation(string));
});

module.exports = router;
