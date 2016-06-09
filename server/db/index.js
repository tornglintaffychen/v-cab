'use strict';
var db = require('./_db');

module.exports = db;

require('./models/user')(db);
require('./models/review')(db);
require('./models/product')(db);
require('./models/order')(db);
require('./models/category')(db);


db.User = db.model('user');
db.Review = db.model('review');
db.Product = db.model('product');
db.Order = db.model('order');
db.Category = db.model('category');
//YI: I don't think you want this double-binding. no reason to store the foreign key on both tables
db.Review.belongsTo(db.User);
db.User.hasMany(db.Review);

db.Review.belongsTo(db.Product);
db.Product.hasMany(db.Review);

db.Category.belongsToMany(db.Product, {through: 'ProductCategory' });
db.Product.belongsToMany(db.Category, {through: 'CategoryProduct' });

db.Order.belongsTo(db.User);
db.User.hasMany(db.Order);
db.Order.hasMany(db.Product);
