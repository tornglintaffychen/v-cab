'use strict';

app.directive('cart', function (CartFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/cart/cart.html',
        link: function (s, e, a) {
            s.itemCount = CartFactory.getItemCount();
            //s.itemCount = 1
        }
    }
})

app.config(function ($stateProvider) {
    $stateProvider.state('inCart', {
        url: "/cart",
        templateUrl: "/js/common/directives/cart/incart.html",
        controller: "CartController",
        resolve: {
            products: function (CartFactory) {
                return CartFactory.getItems(1)
                    .then(function (list) {
                        return list;
                    });

            }
        }
    });
});

app.controller('CartController', function ($scope, products, CartFactory) {
    $scope.toUpdate = null;
    $scope.orderId = 1;
    $scope.products = products;
    console.log($scope.products);
    //$scope.select = ;
    $scope.update = function (product) {
        if (product.quantity !== "") {
            // console.log(product);
            CartFactory.increaseQuantity($scope.orderId, product)
                .then(stuff => {
                    console.log(stuff)
                });

        }
    };
    $scope.remove = CartFactory.removeFromCart;

});
