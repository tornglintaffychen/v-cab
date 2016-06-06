'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/review')(db);
require('./models/product')(db);
require('./models/order')(db);

var User = db.model('user');
var Review = db.model('review');
var Product = db.model('product');
var Order = db.model('order');


Review.belongsTo(User);
User.hasMany(Review)

Review.belongsTo(Product);
Product.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)
Order.hasMany(Product)
