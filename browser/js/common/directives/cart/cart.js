'use strict';

app.directive('cart', function (CartFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/cart/cart.html',
        link: function (s, e, a) {
            s.itemCount = CartFactory.getItemCount();
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

app.controller('CartController', function ($scope, products, CartFactory, $state) {
    $scope.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    $scope.toUpdate = null;
    $scope.orderId = 1;
    $scope.products = products;



    $scope.updateQty = function (product) {
        CartFactory.updateQty(product.orderId, product)
        $state.reload()
    };

    $scope.remove = function (product) {
        CartFactory.removeFromCart(product, $scope.orderId)
            .then(function (removed) {
                $scope.products = $scope.products.filter(function (p) {
                    return p.productId !== removed.productId
                })
            })
            .then(function () {
                // will delete the row in database Order table if the deleted item is the last one in the cart
                if ($scope.products.length === 1) {
                    CartFactory.clearCart($scope.orderId)
                }
                $state.reload()
            })
            //  tc-bk: need to update the bottle number
    }
});
