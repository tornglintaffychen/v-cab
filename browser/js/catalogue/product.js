'use strict'
//state for single product
app.config(function($stateProvider){
	$stateProvider.state('product', {
		url: '/products/:id',
		templateUrl: 'js/catalogue/products.html',
		controller: 'ProductCtrl',
		resolve:{
			oneProduct: function(ProductFactory, $stateParams){
				return ProductFactory.fetchById($stateParams.id);
			}
		}
	})
})

// state for all products
app.config(function ($stateProvider) {
    $stateProvider.state('test', {
        url: '/test',
        templateUrl: 'js/catalogue/products.html'
    });
});


// //product controller for single product
app.controller('ProductCtrl', function($scope, ProductFactory ){
console.log("HI")
	//$scope.product = oneProduct;

})

// //productSSSSS controller for all products
// app.controller('productsCtrl', function($scope, ProductFactory, allProducts){

// 	$scope.products = allProducts;

// })







