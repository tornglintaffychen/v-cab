// 'use strict';
//
app.filter('category', function () {
    return function (products, currentCategory) {
        return products.filter((product) => {
            return hasCurrentCategory(product.categories, currentCategory) || currentCategory ==="all";
        })

    }
})

// //TODO: make it less dependent on the outside world
//TODO : adjust to check against currentCategory as an array

function hasCurrentCategory(categoriesArray, currentCategory){
	//Returns true if at least one element in this array satisfies the provided testing function.
		return categoriesArray.some(function(c){ return c.title===currentCategory})
}
