//ui-view from incart
//for now I just stuck it in home
app.config(function ($stateProvider) {
    $stateProvider.state("checkout", {
        url: "/checkout",
        templateUrl: "js/checkout/checkout.html",
        controller: "checkoutCtrl",
        resolve: {
            user: function (AuthService, AddressFactory) {

                return AuthService.getLoggedInUser()
                    .then(function (user) {
                        user.fullName = AddressFactory.getFullName(user.firstName, user.lastName)
                        return (user);
                    });
            }
        }
    });
})

app.controller("checkoutCtrl", function ($scope, AddressFactory, user, AuthService) {
    $scope.user = user;
    $scope.address = user.address;
    $scope.change = false;
    $scope.toggle = function () {
        $scope.change = !$scope.change;
    }
});
