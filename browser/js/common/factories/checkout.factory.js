app.factory("CheckOutFactory", function($http){
	var mailOptions = {};

	function sendConfirmation () {
		return $http.post("/email/send")
		.then(function(res){
			return res.data;
		});
	}

	function setEmail (email) {
		mailOptions.email = email;
	}

	function setAddress (address) {
		mailOptions.address = address;
	}

	function getMailOptions () {
		return mailOptions;
	}

	function createText (userName, orderId, address, productList, date) {
		mailOptions.text = `Thankyou ${userName}

			Your order: ${orderId}
			date: ${date}

			Will be delivered (date+5-7 days if theres time)`
	}

	return {
		sendConfirmation: sendConfirmation, 
		setAddress: setAddress,
		setEmail: setEmail,
		getMailOptions: getMailOptions
	};
});