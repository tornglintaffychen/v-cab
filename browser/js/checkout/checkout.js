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
					if (user.firstName !== "Bella") {
						user.fullName = AddressFactory.getFullName(user.firstName, user.lastName);

					}

                    return AddressFactory.formatAddress(user.address, user)
				})
                .then(function(user) {
                    console.log(user)
                    return user
                });
                // .then(function(user){
                //     console.log(user)
                //     return AddressFactory.formatAddress(user.address)
                // })
                // .then(function(address){
                //     console.log(address)
                //     return user
                // });

   //              .then(function(user){
   //                  console.log("1", user)
   //                  return AddressFactory.formatAddress(user)
   //              })
   //              .then(function(user){
   //                  console.log(user);
   //                  return user;
   //              });
			}
	    }
	 });
});



//assuming logged in
app.controller("checkoutCtrl", function ($scope, AddressFactory, user, AuthService ) {
	$scope.user = user;
	$scope.change = false;
	$scope.states = AddressFactory.getStates();

    // AddressFactory.formatAddress(user.address)
    // .then(function(address){
    //     console.log(address);
    // });

	$scope.toggle = function () {
		$scope.change = !$scope.change;
	};
	console.log(user);

});
