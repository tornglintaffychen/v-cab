app.controller("ReviewController", function($scope, $http, ReviewFactory){

  // $scope.user = theUser;

  // $scope.userName = function(userId){
  // 	return $http.get('/api/users' + userId)
  // 	.then(function(req){
  // 		console.log(req.data);
  // 		return req.data
  // 	})
  // 	.catch(function(error){
  // 		console.error("something went wrong with retrieving User email in review.js! " + error);
  // 	})
  // }

  $scope.newReview = function (review) {
  return ReviewFactory.addReview(review)
  .then(function(review){
    return review;
  })
  .catch(function(error){
    console.error("problem posting review!", error)
  })
  };
})
// who cares about this 
