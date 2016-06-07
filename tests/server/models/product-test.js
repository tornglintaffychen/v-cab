var sinon = require('sinon');
var expect = require('chai').expect;


var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/vcab';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/product')(db);
require('../../../server/db/models/review')(db);

var Review = db.model('review');
var Product = db.model('product');

describe("getterMethods", function () {
    beforeEach('Sync DB', function () {
        db.sync({
            force: true
        })

    });

    let createProduct = function () {
        return Product.create();
    }
    let createReview = function (rating, product) {
        var props = {
            rating: rating,
            productId: productId
        }
        return Review.create(props);
    }

    createProduct()
        .then(product => {
            var ratings = [];
            for (var i = 1; i <= 5; i++) {
                ratings.push(createReview(i, product))
            }
            return Promise.all(ratings)
        })
        .then(ratings => {
            console.log(ratings)
        })


    it("gets the average rating", function (done) {
        // Taffy Review: should be a test saying avg is 3?
        // See if below code is ok.
        Product.findById(productId)
            .then(function (foundProduct) {
                expect(foundProduct.starRating()).to.equal(3);
            })

    });
});
