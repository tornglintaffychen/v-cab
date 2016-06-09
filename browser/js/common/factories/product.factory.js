'use strict';

app.factory('ProductFactory', function ($http) {
    var ProductFactory = {};
    var currCats = []; 

    function getData(res) {
        return res.data;
    }

    ProductFactory.fetchAll = function () {
        return $http.get('/api/products')
            .then(getData)
    };

    //sv
    ProductFactory.addCats = function (category) {
        currCats.push(category);
    };
    //sv
    ProductFactory.getCurrCats = function () {
        return currCats;
    };

    ProductFactory.fetchById = function (id) {
        return $http.get('/api/products/' + id)
            .then(getData)
            .catch(function (error) {
                console.error(error.message)
            })
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
