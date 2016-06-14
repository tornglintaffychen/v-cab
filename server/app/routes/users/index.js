'use strict';

var router = require('express').Router();
var rootPath = '../../../';
var User = require(rootPath + 'db').User;
var Review = require(rootPath + 'db').Review;
var Order = require(rootPath + 'db').Order;

router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});

function assertIsLoggedIn (req, res, next) {
  if (req.user) next();
  else next(HttpError(401));
}

function selfOrAdmin (req.res, next){
    if (req.user){
        if (req.user === req.requestedUser || req.user.isAdmin) next();)
    }
    else {
        next(HttpError(401));
    }
}

function assertAdmin (req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else next(HttpError(403));
}

// only admin users can see all users
router.get('/', assertAdmin, function (req, res, next) {
    User.findAll({})
        .then(function (users) {
            res.json(users);
        })
        .catch(next);
});

// either registering or just shop as a guest, we need their info no matter what
router.post('/', function (req, res, next) {
    User.create(req.body) // tc-cm TODO: maybe findOrCreate
        .then(function (added) {
            res.json(added);
        })
        .catch(next);
});

// update user, only self and admin can update
router.put('/:id', selfOrAdmin, function (req, res, next) {
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
router.get('/:id', selfOrAdmin, function (req, res, next) {
    User.findOne({
            where: {
                id: req.params.id
            },
            include: [Review,
                Order
            ]
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


module.exports = router;
