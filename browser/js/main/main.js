app.controller('MainCtrl', function ($scope, CartFactory) {
    CartFactory.getItems()
        .then(function (list) {
            $scope.products = list
            $scope.itemCount = list.length
        })
})
