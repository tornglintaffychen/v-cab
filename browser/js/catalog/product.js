'use strict'

//state for single product
app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        templateUrl: 'js/catalog/product.html',
        controller: 'ProductCtrl',
        resolve: {
            //LA: changed from oneProduct to singleProduct
            singleProduct: function (ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.productId)
            }
        }
    })
})

// state for all products
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsCtrl',
        templateUrl: 'js/catalog/products.html',
        resolve: {
            allProducts: function (ProductFactory) {
                return ProductFactory.fetchAll();
            }
        }
    });

});


// //product controller for single product
app.controller('ProductCtrl', function ($scope, singleProduct, CartFactory) {
    $scope.product = singleProduct;
    $scope.addToCart = CartFactory.addToCart;
})

// //products controller for all products
app.controller('ProductsCtrl', function ($scope, CategoryFactory, allProducts, ProductFactory, CartFactory, $window) {
    $scope.products = allProducts;
    $scope.addToCart = CartFactory.addToCart;
});
