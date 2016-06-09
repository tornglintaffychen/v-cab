'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./Orders'));
router.use('/reviews', require('./Reviews'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
