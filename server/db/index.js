'use strict';
var db = require('./_db');

module.exports = db;

require('./models/user')(db);
require('./models/review')(db);
require('./models/product')(db);
require('./models/order')(db);
<<<<<<< HEAD

db.User = db.model('user');
db.Review = db.model('review');
db.Product = db.model('product');
db.Order = db.model('order');

=======
>>>>>>> 3cc376197d6bfe6b6b67314d85205aff66260413

db.User = db.model('user');
db.Review = db.model('review');
db.Product = db.model('product');
db.Order = db.model('order');


<<<<<<< HEAD
Order.belongsTo(User)
User.hasMany(Order)
Order.hasMany(Product)
//let's make sure we've got all this connected correctly
//do we need to add any other links?
//let's go through models and make sure
//if we do Review belongsTo User, how does that work with unregistered users?
=======
db.Review.belongsTo(db.User);
db.User.hasMany(db.Review)

db.Review.belongsTo(db.Product);
db.Product.hasMany(db.Review)

db.Order.belongsTo(db.User)
db.User.hasMany(db.Order)
db.Order.hasMany(db.Product)
>>>>>>> 3cc376197d6bfe6b6b67314d85205aff66260413
