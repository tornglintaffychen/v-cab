'use strict'
//state for single product
app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:id',
        templateUrl: 'js/detail/templates/product.html',
        controller: 'ProductCtrl',
        resolve: {
            oneProduct: function (ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.id);
            }
        }
    })
})

// state for all products
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/catalogue/products.html',
        resolve: {
            allProducts: function (ProductFactory) {
                return ProductFactory.fetchAll();
            }
        }
    });
});


// //product controller for single product
app.controller('ProductCtrl', function ($scope, oneProduct) {
    $scope.product = oneProduct;
})

// //products controller for all products
app.controller('ProductsCtrl', function ($scope, allProducts) {
    $scope.products = allProducts;
})
