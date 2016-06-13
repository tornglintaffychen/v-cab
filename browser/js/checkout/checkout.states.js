app.config(function ($stateProvider) {

    $stateProvider.state("checkout", {
        url: "/checkout",
        templateUrl: "js/checkout/checkout.html",
        controller: "checkoutCtrl"
       
	})
    .state("checkout.creditcard", {
        url: "/creditcard",
        templateUrl: "js/checkout/creditcard.html"
    })
    .state("checkout.confirm", {
        url: "/confirm",
        templateUrl: "js/checkout/confirm.html",
        controller: "confirmCtrl"
    })
    .state("checkout.address", {
    	url: "/address",
    	templateUrl: "js/checkout/address.html",
        controller: "addressCtrl",
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
   
     
});


