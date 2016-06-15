
app.controller("ReviewController", function($scope, $http, ReviewFactory){

  $scope.newReview = function(uId, pId) {
  	$scope.review.userId = uId;
  	$scope.review.productId = pId;
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