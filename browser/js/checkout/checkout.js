//ui-view from incart
//for now I just stuck it in home
//assuming logged in
app.controller("checkoutCtrl", function ($scope, AuthService) {
	
});

app.controller("addressCtrl", function ($scope, AddressFactory, user, AuthService ) {
    $scope.user = user;
    $scope.shippingInfo = {};
    $scope.states = AddressFactory.getStates();
    $scope.toggle = function () {
        $scope.change = !$scope.change;
    };
    $scope.setAddress = function (address) {
        if (address) {
            $scope.shippingInfo = { 
                address: "no change"
            };
        }
        //else //validate= state.go
    };
});