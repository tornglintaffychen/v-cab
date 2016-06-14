var express = require('express');
var router = express.Router();
var passport = require('passport');

var rootPath = '../../../';
var HttpError = require('../../../utils/HttpError')
var User = require(rootPath + 'db').User;
var Order = require(rootPath + 'db').Order;
var OrderProduct = require(rootPath + 'db').OrderProduct;

//sv I just moved this bit out while I was reading to make it easier to see
function findOrCreateUser(req, res, next) {
    // user will be either req.user (logged in),
    // or we create one and log her in
    var user = req.user ? Promise.resolve(req.user) :
        User.create({
            firstName: 'Unregistered',
            lastName: 'Person'
        })
        .then(function (createdUser) {
            req.logIn(createdUser, function (loginErr) {
                if (loginErr) return next(loginErr);
                // res.status(200).send({
                //     user: createdUser.sanitize()
                // });
            });
            return createdUser;
        });

    return user;
}

//sv we should make some class methods
//sv//names weren't matching up with model - inventory vs quantity
function addProductToOrder(orderId, reqObj) {
    return OrderProduct.create({
        orderId: orderId,
        productId: reqObj.id,
        price: reqObj.price,
        title: reqObj.title,
        quantity: 1
    });
}


function createOrUpdateOrderProduct (orderId, reqObj) {
    return OrderProduct.findOne({
            where: {
                orderId: orderId,
                productId: reqObj.id
            }
        })
        .then(function (product) {
            if (product) {
                return product.update({
                        quantity: product.quantity + 1
                    })
                    .then(function (updatedProduct) {
                        return updatedProduct;
                    });
            } else {
                return addProductToOrder(orderId, reqObj);
            }
        });
}

function assertAdmin (req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else next(HttpError(403));
}

function selfOrAdmin (req,res, next){
    if (req.user){
        if (req.user === req.requestedUser || req.user.isAdmin) next();
    }
    else {
        next(HttpError(401));
    }
}

router.param('userId', function (req, res, next, userId) {
  User.findById(userId)
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});

// find all orders, only Admin can do this
router.get('/', assertAdmin, function (req, res, next) {
    Order.findAll({
            where: req.query
        })
        .then(function (orders) {
            res.json(orders);
        })
        .catch(next);
});

//find all products by order id for inCart only
router.get('/products', function (req, res, next) {
    OrderProduct.findAll({
            where: {
                orderId: req.session.orderId
            }
        })
        .then(function (order) {
            res.json(order);
        })
        .catch(next);
});

// find all products by order id for any order
router.get('/:id', function (req, res, next) {
    OrderProduct.findAll({
            where: {
                orderId: req.params.id
            }
        })
        .then(function (order) {
            res.json(order);
        })
        .catch(next);
});

// add to cart
router.post('/addToCart', function (req, res, next) {
    //sv- moved this bit out just for now
    var user = findOrCreateUser(req, res, next);
    user.then(function (createdUser) {
        Order.findOne({
                where: {
                    userId: createdUser.id,
                    status: 'inCart'
                }
            })
            .then(function (inCartOrder) {
                //sv if order exists
                if (inCartOrder) {
                    //sv add id to session
                    req.session.orderId = inCartOrder.id;
                    //sv add item to table
                    createOrUpdateOrderProduct(inCartOrder.id, req.body)
                        .then(function (addedProduct) {
                            res.json(addedProduct);
                        })
                        .catch(next);

                } else {
                    //sv if not, create Order
                    Order.create({
                            userId: createdUser.id
                        })
                        .then(function (createdOrder) {
                            req.session.orderId = createdOrder.id;
                            return createOrUpdateOrderProduct(createdOrder.id, req.body);
                        })
                        .then(function (addedProduct) {
                            res.json(addedProduct);
                        })
                        .catch(next);
                }
            });
    });
});



// tc: edit one item in the shopping cart or within 30 mins after placing order
// admin should be able to edit everything in the order
// router.put('/editItem', function (req, res, next) {
//     OrderProduct.update(req.body, {
//             where: {
//                 orderId: req.session.orderId,
//                 productId: req.body.productId
//             }
//         })
//         .then(function (updatedItem) {
//             res.json(updatedItem);
//         })
//         .catch(next);
// });

// maybe update cart like this: so only self or admin can update the cart
router.put('/:userId', selfOrAdmin, function (req, res, next) {
    OrderProduct.update(req.body, {
            where: {
                orderId: req.session.orderId,
                productId: req.body.productId
            }
        })
        .then(function (updatedItem) {
            res.json(updatedItem);
        })
        .catch(next);
});

// delete one item in the shopping cart, interesting enought that it's a put route
// router.put('/deleteItem', function (req, res, next) {
//     OrderProduct.destroy({
//             where: {
//                 orderId: req.session.orderId,
//                 productId: req.body.productId
//             }
//         })
//         .then(function (removed) {
//             res.json(removed);
//         })
//         .catch(next)
// });

// maybe update cart like this: so only self or admin can delete item from the cart
router.delete('/:userId/:productId', selfOrAdmin, function (req, res, next) {
    OrderProduct.destroy({
            where: {
                orderId: req.session.orderId,
                productId: req.params.productId
            }
        })
        .then(function (removed) {
            res.json(removed);
        })
        .catch(next)
});

// clear the shopping cart
// maybe update cart like this: so only self or admin can clear the cart
router.delete('/:userId', selfOrAdmin, function (req, res, next) {
    Order.destroy({
            where: {
                id: req.session.orderId
            }
        })
        .catch(next);
});

module.exports = router;
