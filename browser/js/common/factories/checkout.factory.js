app.factory("CheckOutFactory", function($http){
	var mailOptions = {};

	function sendConfirmation (email) {
		// mailOptions.date = Date.now();
		return $http.post("/send/orderConfirmation", 
		mailOptions)
		.then(function(res){
			return res.data;
		});
	}
	
	function setName (name) {
		console.log("NAME", name);
		mailOptions.name = name;
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

	return {
		sendConfirmation: sendConfirmation, 
		setAddress: setAddress,
		setEmail: setEmail,
		setName: setName,
		getMailOptions: getMailOptions
	};
});