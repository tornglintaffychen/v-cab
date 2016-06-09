'use strict';

app.directive('cart', function () {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/cart/cart.html',
        controller: "CartController"
    }
})

app.config(function ($stateProvider) {
    $stateProvider.state('inCart', {
        url: "/cart",
        templateUrl: "/js/common/directives/cart/incart.html",
        controller: "CartController"
    })
})

app.controller('CartController', function ($scope, CartFactory) {
    $scope.productList = CartFactory.getProductList();
    // tc: should be = CartFactory.itemCount() hard coded 1 just for seeing
    $scope.itemCount = 1;
    $scope.currentCartId = CartFactory.getCurrentCartId();

    $scope.updateCart = function (orderId) {
        return CartFactory.updateCart(orderId)
    }
})
