'use strict';

app.factory('ProductFactory', function ($http) {
    var ProductFactory = {};
    var currCategories = [];

    function getData(res) {
        return res.data;
    }

    ProductFactory.addToCart = function (product) {
        console.log("product", product);
        $http.post('/api/order/addToCart', product)
        .then(getData);
    };

    ProductFactory.fetchAll = function () {
        return $http.get('/api/products')
            .then(getData);
    };

    //sv
    ProductFactory.addCategory = function (category) {
        currCategories.push(category);
    };

    //sv
    ProductFactory.getCurrentCategories = function () {
        return currCategories;
    };

    ProductFactory.fetchById = function (id) {
        return $http.get('/api/products/' + id)
            .then(getData)
            .catch(function (error) {
                console.error(error.message)
            });
    };
    ProductFactory.fetchProductsByCategory = function (categoryid) {
        return $http.get('/api/catagories/' + categoryid)
            .then(getData)
            .catch(function (error) {
                console.error(error.message);
            });
    };

    return ProductFactory;
});
