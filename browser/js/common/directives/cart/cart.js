'use strict';

app.directive('cart', function (CartFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/cart/cart.html',
        link: function (s, e, a) {
            s.itemCount = CartFactory.itemCount()
        }
    }
})

app.config(function ($stateProvider) {
    $stateProvider.state('inCart', {
        url: "/cart",
        templateUrl: "/js/common/directives/cart/incart.html",
        controller: "CartController",
        // resolve: {
        //     productList: function (CartFactory) {
        //         return CartFactory.getOrder(1)
        //             .then(function (list) {
        //                 // CartFactory.productList = list
        //                 return list;
        //             })
        //
        //     }
        // }
    })
})

app.controller('CartController', function ($scope, CartFactory) {

    $scope.orderId = 1;
    $scope.products = [];
    // CartFactory.getOrder()
    // .then(function(order){
    //     console.log(order);
    // });
  

    // $scope.actualProduct = CartFactory.actualProduct;
    // $scope.qty = CartFactory.productList.productQty;


    // tc: should be = CartFactory.itemCount() hard coded 1 just for seeing
    // $scope.currentCartId = CartFactory.currentCartId;

    // $scope.updateCart = function (orderId) {
    //     return CartFactory.updateCart(orderId)
    // }

    // // $scope.getOrder = function (orderId) {
    // //     CartFactory.getOrder(orderId)
    // //         .then(function (updatedList) {
    // //             $scope.productList = updatedList;
    // //         })
    // //
    // }

})
