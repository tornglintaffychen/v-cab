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

  $scope.newReview = function() {
  return ReviewFactory.addReview($scope.review)
  .then(function(review){
    $scope.message = "Thank you for your review!";
  })
  .catch(function(error){
    $scope.message = "There was a problem posting your review.";
  })
  };

// // who cares about this 

// id: number
// rating: number
// text: text
$scope.logModel = function(){
  console.log($scope.review)
}
})
