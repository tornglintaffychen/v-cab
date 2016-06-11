var express = require('express');
var router = express.Router();
var passport = require('passport');

var rootPath = '../../../';
var User = require(rootPath + 'db').User;
var Order = require(rootPath + 'db').Order;
var OrderProduct = require(rootPath + 'db').OrderProduct;
var chalk = require('chalk');

//sv I just moved this bit out while I was reading to make it easier to see
function findOrCreateUser (req, res, next) {
    // user will be either req.user (logged in),
    // or we create one and log her in
    var user = req.user ? Promise.resolve(req.user) :
        User.create({
            firstName: 'Bella',
            lastName: 'Swan'
        })
        .then(function (createdUser) {
            // req.logIn(createdUser, function (loginErr) {
            //     if (loginErr) return next(loginErr);
            //     res.status(200).send({
            //         user: createdUser.sanitize()
            //     });
            // });
            return createdUser;
        });

    return user; 
}
//sv//names weren't matching up with model - inventory vs quantity 
function addProductToOrder (orderId, reqObj) {
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
    .then(function(product){
        if (product) {
            console.log("update", product.quantity);
            return product.update({quantity: product.quantity+1})
            .then(function(updatedProduct) {
                return updatedProduct;
            });
        }
        else {
            console.log("addProductToOrder");
            return addProductToOrder (orderId, reqObj);
        }
    });
}
//sv we're repeating a lot let's make some model hooks at some point
// function findOrCreateOrder (userId, req) {
//     console.log("CHECK DUPLICATE PRODUCTS", req.session);
//     // return Order.findOne({
//     //         where: {
//     //             userId: userId,
//     //             status: 'inCart'
//     //         }
//     //     }).
//     //     then(function (){

//     //     });
// }

// find all orders 
router.get('/', function (req, res, next) {
    Order.findAll({
            where: req.query
        })
        .then(function (orders) {
            res.json(orders);
        })
        .catch(next);
});

//find all products by order id
router.get('/products', function (req, res, next) {
    console.log("?????????????????");
    console.log("SESSIONSSSS", fin);
    OrderProduct.findAll({
            where: {
                orderId: req.session.orderId
            }
    })
    .then(function (order) {
        console.log("returieve items from order", order);
        res.json(order);
    })
    .catch(next);
});

// add to cart
router.post('/addToCart', function (req, res, next) {
    
    //sv- moved this bit out just for now
    var user = findOrCreateUser(req, next);
    user.then(function(createdUser) {
        console.log("HERE", createdUser.id);
        Order.findOne({
            where: {
                userId: createdUser.id,
                status: 'inCart'
            }
        })
        .then(function (inCartOrder) {

            if (inCartOrder) {
                
                var id = inCartOrder.id;
                req.session.orderId = id;

                console.log("order exists", req.session);

                createOrUpdateOrderProduct(id, req.body)
                .then(function(addedProduct) {
                    console.log("ADDEDPRODUCT", addedProduct);
                    res.json(addedProduct);
                })
                .catch(next);

            } else {
                console.log("no order");
                // if not, create Order first then add to OrderProduct
                Order.create({
                    userId: createdUser.id
                })
                .then(function (createdOrder) {
                    checkDuplicates (createdOrder.id, req.body);
                    return addProductToOrder (createdOrder.id, req.body);
                })
                .then(function (addedProduct) {
                    req.session.orderId = addedProduct.orderId;
                    res.json(addedProduct);
                })
                .catch(next);
            }
        });
    });
});

// edit one item in the shopping cart
router.put('/:id/editItem', function (req, res, next) {
    OrderProduct.update(req.body, {
            where: {
                orderId: req.params.id,
                productId: req.body.productId
            }
        })
        .then(function (updatedItem) {
            res.json(updatedItem);
        })
        .catch(next);
});

// delete one item in the shopping cart, interesting enought that it's a put route
router.put('/:id/deleteItem', function (req, res, next) {
    OrderProduct.destroy({
            where: {
                orderId: req.params.id,
                productId: req.body.productId
            }
    })
    .then(function (removed) {
        res.json(removed);
    });
});


// admin should be able to edit everything in the order
// users should be able to cancel order 30 mins limit
router.put('/:orderid/product/:productid', function (req, res, next) {
    OrderProduct.update(req.body, {
            where: {
                productId: req.params.productid,
                orderId: req.params.orderid
            }
        })
        .then(function (product) {
            return product.update(req.body.product);
        })
        .then(function (product) {
            res.json(product);
        })
        .catch(next);

});

// clear the shopping cart
router.delete('/:id', function (req, res, next) {
    Order.destroy({
            where: {
                id: req.params.id
            }
        })
        .catch(next);
});

module.exports = router;