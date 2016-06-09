'use strict'
<<<<<<< HEAD:browser/js/catalogue/product.js

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
=======
//state for single product
app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        templateUrl: 'js/catalog/products.html',
        controller: 'ProductCtrl',
        resolve: {
					//LA: changed from oneProduct to singleProduct
            singleProduct: function (ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.id);
            }
        }
    })
})

// state for all products
app.config(function ($stateProvider) {
    $stateProvider.state('home.products', {
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
app.controller('ProductCtrl', function ($scope, singleProduct) {
    $scope.product = singleProduct;
})

// //products controller for all products
app.controller('ProductsCtrl', function ($scope, allProducts) {
    $scope.products = allProducts;
>>>>>>> master:browser/js/catalog/product.js
});
