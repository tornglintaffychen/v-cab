// For single product view

// tc: please continue to work on this part
app.factory('ProductFactory', function ($http) {
    function getData(res) {
        return res.data;
    }
    function getProduct (productId) {
        $http.get('/api/order/' + productId)
            .then(getData);
    }
    
    return {
        getProduct: getProduct
    };
});

// we need to have $scope.product
app.controller('ProductCtrl', function (ProductFactory, $scope) {
    $scope.product;
})
