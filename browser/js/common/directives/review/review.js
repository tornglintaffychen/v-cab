app.controller("ReviewController", function($scope, $http, UserFactory) {
  $scope.userName = function(userId){
  	return $http.get('/api/users' + userId)
  	.then(function(req){
  		console.log(req.data);
  		return req.data
  	})
  	.catch(function(error){
  		console.error("something went wrong with retrieving User email in review.js! " + error);
  	})
  }
<<<<<<< HEAD
 }
=======
})
>>>>>>> 0651bf64de0a22b0cd89afc1d1018cfd0b61669b
