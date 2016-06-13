app.factory("CheckOutFactory", function($http){
	function sendConfirmation () {
		return $http.post("/email/send")
		// .then(function(res){
		// 	//this is a test ill delete later
		// 	return res.data;
		// });
	}
	return {
		sendConfirmation: sendConfirmation
	};
});