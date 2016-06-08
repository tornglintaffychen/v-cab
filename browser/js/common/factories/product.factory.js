'use strict';

app.factory('ProductFactory', function($http){
	var ProductFactory = {};

	function getData(res) { 
		return res.data; 
	}

	ProductFactory.fetchAll = function(){
		return $http.get('/api/products')
		.then(getData)
	};

	ProductFactory.fetchById = function (id) {
		return $http.get ('/api/products/' + id)
		.then(function (response){
			return response.data;
		});
	};

	return ProductFactory;
})