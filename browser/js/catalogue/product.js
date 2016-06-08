'use strict'
//state for single product
app.config(function($stateProvider){
	$stateProvider.state('product', {
		url: '/products' + $stateParams.id,
		templateUrl: '/catalogue/products.html',
		controller: ProductCtrl,
		resolve:{
			oneProduct: function(ProductFactory){
				return ProductFactory.fetchById($stateParams.id);
			}
		}
	})
})



//state for all products
app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products',
		templateUrl: '',
		controller: ProductsCtrl,
		resolve:{
			allProducts: function(ProductFactory){
				return ProductFactory.fetchAll();
			}
		}
	})
})



//product controller for single product
app.controller('productCtrl', function($scope, ProductFactory, theProduct){

	$scope.product = theProduct;

})

//productSSSSS controller for all products
app.controller('productsCtrl', function($scope, ProductFactory, allProducts){

	$scope.products = allProducts;

})







