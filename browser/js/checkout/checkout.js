//ui-view from incart
//for now I just stuck it in home
app.config(function ($stateProvider) {
	$stateProvider.state("checkout", {
		url: "/checkout", 
		templateUrl: "js/checkout/checkout.html",
		controller: "checkoutCtrl",
		resolve: {
			user: function (AuthService) {
				return AuthService.getLoggedInUser()
				.then(function(user){
					return (user);
				});
			}
		}
	});
})

app.controller("checkoutCtrl", function ($scope, AddressFactory, user, AuthService ) {
	$scope.user = user;
	$scope.address = user.address;

	console.log("here", AddressFactory.getFullName($scope.user.firstName, $scope.user.lastName));
	console.log(user);
	// AuthService.getLoggedInUser()
	// .then(function(user){
	// 	console.log(user);
	// });

});