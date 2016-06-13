//ui-view from incart
//for now I just stuck it in home
//assuming logged in
app.controller("checkoutCtrl", function ($state, CheckOutFactory, $scope, AuthService) {
    $scope.showBack = function () {
        if ($state.is("checkout.address")) {
            return false;
        } else {
            return true;
        }
    }
    $scope.showNext = function () {
        if ($state.is("checkout.confirm")) {
            return false;
        } else {
            return true;
        }
    }
    $scope.back = function() {
        if ($state.is("checkout.creditcard")) {
            $state.go("checkout.address");
        }
        if ($state.current.name !== "checkout.confirm") {
            $state.go("checkout.creditcard");
        }
    };
	$scope.next = function(condition) {
        if ($state.is("checkout.address")) {
            $state.go("checkout.creditcard");
        }
        if ($state.current.name !== "checkout.creditcard") {
            $state.go("checkout.confrim");
        }
    };
    
});

app.controller("confirmCtrl", function($scope, CheckOutFactory){

    $scope.submit = CheckOutFactory.sendConfirmation;
});

app.controller("addressCtrl", function ($scope, CheckOutFactory,  AddressFactory, user, AuthService ) {
    $scope.user = user;
    console.log(user)
    $scope.shippingAddress;
    $scope.states = AddressFactory.getStates();
    $scope.state = "New York";

    console.log($scope.userEmail)
    $scope.setAddress = function (address) {
        console.log(address);
        if (address) {
            CheckOutFactory.setAddress(address);
        }
        else {
            var address = $scope.firstname+" "+$scope.lastname+" "+$scope.address +","+ $scope.apt +","+ $scope.city+" "+$scope.state+" "+$scope.zip;

            CheckOutFactory.setAddress(address);
            console.log("street", address);
        }
        $scope.shippingAddress = address;
    }
});