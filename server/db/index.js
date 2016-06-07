'use strict';
var db = require('./_db');

module.exports = db;

require('./models/user')(db);
require('./models/review')(db);
require('./models/product')(db);
require('./models/order')(db);

db.User = db.model('user');
db.Review = db.model('review');
db.Product = db.model('product');
db.Order = db.model('order');


Review.belongsTo(User);
User.hasMany(Review)

Review.belongsTo(Product);
Product.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)
Order.hasMany(Product)
//let's make sure we've got all this connected correctly
//do we need to add any other links?
//let's go through models and make sure
//if we do Review belongsTo User, how does that work with unregistered users?