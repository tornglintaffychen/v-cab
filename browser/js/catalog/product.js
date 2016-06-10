'use strict'

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
app.controller('ProductCtrl', function ($scope, singleProduct) {
    $scope.product = singleProduct;
})

// //products controller for all products
app.controller('ProductsCtrl', function ($scope, CategoryFactory, allProducts ) {
    $scope.products = allProducts;
		
});
