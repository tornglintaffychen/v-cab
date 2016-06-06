'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Review = require('./models/review')(db);

Review.belongsTo(User);
Review.belongsTo(Product);
