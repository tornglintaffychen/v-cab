var express = require('express');
var router = express.Router();

var rootPath = '../../../';
var Category = require(rootPath + 'db').Category;
var Product = require(rootPath + 'db').Product;
///get all Categories
router.get("/", function (req, res, next) {
    Category.findAll({
            include: Product
        })
        .then(function (categories) {
            if (categories) {
                res.json(categories);
            } else {
                res.status(404).send("no categories");
            }
        }).catch(next);
});

// //get all products by catid
router.get("/:id", function (req, res, next) {
    Category.findAll({
        where: {
            id: req.params.id
        },
        include: Product
    }).then(function (category) {
        if (category) {
            res.json(category);
        } else {
            res.status(404).send("no category");
        }
    }).catch(next);
});

// create category
// router.post("/:id", function (req, res, next) {
// 	Category.findAll({
// 		where: {
// 			id: req.param.id
// 		},
// 		include: [Product]
// 	}).then(function(products) {
// 		if (products) {
// 			res.json(products);
// 		}
// 		else {
// 			res.status(404).send("no products");
// 		}
// 	}).catch(next);
// });
//get all categories by productid

module.exports = router;
