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

app.controller("checkoutCtrl", function ($scope, user, AuthService) {
	$scope.name;
	console.log(user);
	// AuthService.getLoggedInUser()
	// .then(function(user){
	// 	console.log(user);
	// });

});