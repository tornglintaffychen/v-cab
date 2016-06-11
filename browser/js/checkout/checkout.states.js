app.config(function ($stateProvider) {
    $stateProvider.state("checkout", {
        url: "/checkout",
        templateUrl: "js/checkout/checkout.html",
        controller: "checkoutCtrl",

	});

    $stateProvider.state("checkout.address", {
    	url: "/checkout/address",
    	templateUrl: "js/checkout/address.html",
        controller: "checkoutCtrl",
        resolve: {
            user: function (AuthService, AddressFactory) {
				return AuthService.getLoggedInUser()
				.then(function(user){
					if (user.firstName !== "Bella") {
						user.fullName = AddressFactory.getFullName(user.firstName, user.lastName);

					}
                    return AddressFactory.formatAddress(user);
				})
                .then(function(user) {
                    return user;
                });
			}
	    }
    });
    $stateProvider.state("checkout.creditcard", {
    	url: "/checkout/creditcard",
    	templateUrl: "js/checkout/creditcard.html",
        controller: "checkoutCtrl"
    });
     


});


