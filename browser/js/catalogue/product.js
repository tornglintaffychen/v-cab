'use strict'

// //product controller for single product
app.controller('ProductCtrl', function ($scope, oneProduct) {
    $scope.product = oneProduct;
});

// //products controller for all products
app.controller('ProductsCtrl', function ($scope, ProductFactory) {
    ProductFactory.fetchAll()
    .then(function(products){
        $scope.products = products;
    });
    $scope.selectedCats = ProductFactory.getCurrCats;
});
