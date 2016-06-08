'use strict';

app.directive('cart', function() {
  return{
		restrict: 'E',
		templateUrl:"/cart.html",
		link: function(scope, element, attrs) {
			// scope.numOfItems = ProductFactory.numOfItems; //TODO pending Katie's code
		}
	}
})
