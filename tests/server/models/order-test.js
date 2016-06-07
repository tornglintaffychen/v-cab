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
function makeRandomProduct () {
  var randomId = Math.floor(Math.random() * (100 - 1) + 1);
    return {productId: randomId, productPrice: 2}
}


describe("getterMethods", function () {


  beforeEach('Sync DB', function(){
    db.sync({force:true})
    let createOrder = function (order){
      return Review.create(order);
    }
  });

  let products = Array(20).fill(1).map(function () {
    return makeRandomProduct()
  });

  it("gets the total", function(done) {
    // console.log(products);

    Order.create({productList: products})
    .then(function (order) {
      // console.log(order);
      expect(order.total).to.equal(40);
        done();
    })
    .catch((err) => {done(err)})
  })

})
