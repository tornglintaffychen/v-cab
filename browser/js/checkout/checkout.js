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
				.then(function(user){
					if (user) {
						user.fullName = AddressFactory.getFullName(user.firstName, user.lastName);
					}
					return (user);
				});
			}
		}
	});
});



//assuming logged in
app.controller("checkoutCtrl", function ($scope, AddressFactory, user, AuthService ) {
	$scope.user = user;
	$scope.change = false;
	$scope.states = AddressFactory.getStates();

	$scope.toggle = function () {
		$scope.change = !$scope.change;
	};
	console.log(user);

});