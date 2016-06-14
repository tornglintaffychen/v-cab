app.controller("ReviewController", function($scope, UserFactory) {
  $scope.getUser = function(id){
  	return UserFactory.fetchById()
  	.then(function(foundUser){
  		return foundUser.email;
  	})
  	.catch(function(error){
  		console.error("something went wrong with fetching the user email! ", error)
  	})
  })
