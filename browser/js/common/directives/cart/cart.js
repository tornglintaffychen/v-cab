'use strict';

app.directive('cart', function (CartFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/cart/cart.html',
        link: function (scope) {
            CartFactory.getItems()
                .then(function (products) {
                    // scope.products = products;
                    var count = products.reduce(function (a, b) {
                        return a + b.quantity
                    }, 0)
                    CartFactory.count = count
                    scope.count = CartFactory.count
                })
        }
    };
});

app.config(function ($stateProvider) {
    $stateProvider.state('inCart', {
        url: "/cart",
        controller: "CartController",
        templateUrl: "/js/common/directives/cart/incart.html",
        resolve: {
            products: function (CartFactory) {
                return CartFactory.getItems()
                    .then(function (list) {
                        return list;
                    });

            }
        }
    });
});

app.controller('CartController', function ($scope, products, CartFactory, $state) {
    $scope.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    $scope.toUpdate = null;
    $scope.userId = CartFactory.userId;
    $scope.products = products;

    $scope.proceedToCheckOut = function () {
        console.log("hi")
        $state.go('checkout');
    };

    $scope.editItem = CartFactory.editItem;

    $scope.deleteItem = function (userId, productId) {
        CartFactory.deleteItem(productId, userId)
            .then(function (removed) {
                $scope.products = $scope.products.filter(function (p) {
                    return p.productId !== removed.productId
                });
                CartFactory.count = $scope.products.reduce(function (a, b) {
                    return a + b.quantity;
                }, 0)
            })
            .then(function () {
                // will delete the row in database Order table if the deleted item is the last one in the cart
                if ($scope.products.length === 1) {
                    CartFactory.clearCart()
                }
                $state.reload();
            });
        //  tc-bk: need to update the bottle number
    }
});
