'use strict';

app.filter('category', function(CategoryFactory){
	return function (categories) {
		return categories.filter((category) => {
			console.log(category);
			return category === CategoryFactory.currentCategory})
	}
})


//TODO: getting products in this filter adjust
//Also make it less dependent on the outside world
