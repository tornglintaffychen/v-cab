//ui-view from incart
//for now I just stuck it in home
//assuming logged in


app.controller("checkoutCtrl", function ($state, CheckOutFactory, $scope, AuthService) {

    $scope.back = function() {
        if ($state.is("checkout.creditcard")) {
            $state.go("checkout.address");
        }
        if ($state.current.name !== "checkout.confirm") {
            $state.go("checkout.creditcard");
        }
    };
	$scope.next = function() {
        // console.log("here", $state.is)
        if ($state.is("checkout.address")) {
            $state.go("checkout.creditcard");
        }
        if ($state.is("checkout.creditcard")) {
            $state.go("checkout.confirm");
        }
    };

});

app.controller("confirmCtrl", function($scope, CheckOutFactory, CartFactory, products){
    $scope.finalInfo = CheckOutFactory.getMailOptions()
    console.log("finalInfo", $scope.finalInfo)
    $scope.products = products;
    $scope.total = CartFactory.total($scope.products);
    $scope.submit = CheckOutFactory.sendConfirmation;
});

app.controller("addressCtrl", function ($scope, CheckOutFactory,  AddressFactory, user, AuthService ) {
    $scope.user = user;

    $scope.confirmation = function(){
        if ($scope.user.email) CheckOutFactory.setEmail($scope.user.email)
        var allInfo = CheckOutFactory.getMailOptions();
        return allInfo.email && allInfo.address;
    }
    $scope.states = AddressFactory.getStates();
    $scope.state = "New York";
    $scope.setEmail = CheckOutFactory.setEmail;

    $scope.setAddress = function (address) {
        if (address) {
            CheckOutFactory.setName($scope.user.fullName);
            CheckOutFactory.setAddress(address);
        }
        else {
            var address = $scope.address +","+ $scope.apt +","+ $scope.city+" "+$scope.state+" "+$scope.zip;
            console.log(address)
            CheckOutFactory.setName($scope.firstname+" "+$scope.lastname);
            CheckOutFactory.setAddress(address);
        }
    };
});
