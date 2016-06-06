'use strict';
var db = require('./_db');

module.exports = db;

var User = require('./models/user')(db);
var Review = require('./models/review')(db);
var Product = require('./models/product')(db);
var Order = require('./models/order')(db);

Review.belongsTo(User);
User.hasMany(Review)

Review.belongsTo(Product);
Product.hasMany(Review)

Order.belongs(User)
User.hasMany(Order)
Order.hasMany(Product)
