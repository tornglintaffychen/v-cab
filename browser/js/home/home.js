app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve:{
            allProducts: function (ProductFactory) {
                return ProductFactory.fetchAll();
            }
        }
    });
});

app.controller('HomeCtrl', function($scope, allProducts, CartFactory){
    $scope.products = allProducts;
    $scope.addToCart = CartFactory.addToCart;
})
