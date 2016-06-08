'use strict';

app.factory('ProductFactory', function ($http) {
    var ProductFactory = {};

    function getData(res) {
        return res.data;
    }

    ProductFactory.fetchAll = function () {
        return $http.get('/api/products')
            .then(getData)
    };

    ProductFactory.fetchById = function (id) {
        return $http.get('/api/products/' + id)
            .then(getData)
            .catch(function (error) {
                console.error(error.message)
            })
    };

    return ProductFactory;
})
