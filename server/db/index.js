'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/review')(db);
require('./models/product')(db);
require('./models/order')(db);

Review.belongsTo(User);
User.hasMany(Review)

Review.belongsTo(Product);
Product.hasMany(Review)

Order.belongs(User)
User.hasMany(Order)
Order.hasMany(Product)
