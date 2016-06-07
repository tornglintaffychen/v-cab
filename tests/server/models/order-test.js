var sinon = require('sinon');
var expect = require('chai').expect;


var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/vcab';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/order')(db);
require('../../../server/db/models/user')(db);

var User = db.model('user');
var Order = db.model('order');

//makeRandomProduct () => obj[{productId: id, productPrice: price}
// Taffy Review: we changed the productList to [{productId: id, productPrice: price, qty: num}]
// to keep track the order qty of eqch product
function makeRandomProduct() {
    var randomId = Math.floor(Math.random() * (100 - 1) + 1);
    // Taffy Review: add qty
    return {
        productId: randomId,
        productPrice: 2,
        productQty: 3
    }
}


describe("getterMethods", function() {

    beforeEach('Sync DB', function() {
        db.sync({
            force: true
        })
        let createOrder = function(order) {
            // Taffy Review: shouldn't it be Order.create?
            return Review.create(order);
        }
    });

    // Taffy Review: is it array of 20 products?
    let products = Array(20).fill(1).map(function() {
        return makeRandomProduct()
    });

    it("gets the total", function(done) {
        Order.create({
                productList: products
            })
            .then(function(order) {
                // added qty 3 per each product, so the result should be $120
                expect(order.total).to.equal(120);
                done();
            })
            .catch((err) => {
                done(err)
            })
    })

})
