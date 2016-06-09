//Factory

//communicates between main page and the cart icon overlay
app.factory('CartFactory', function($http) {
	function getData(response) {
		return response.data;
	}
	return {
		//have a variable to show cart count
		itemCount: function (OrderId) {
			$http.get('/api/orders')
		},

	}
})
