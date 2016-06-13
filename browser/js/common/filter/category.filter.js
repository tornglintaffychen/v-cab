// 'use strict';
//
app.filter('category', function (CategoryFactory) {
    return function (products, currentCategory) {
        return products.filter((product) => {
            return hasCurrentCategory(product.categories, currentCategory) || currentCategory ==="all";
        })

    }
})

// //TODO: getting products in this filter adjust
// //Also make it less dependent on the outside world

function hasCurrentCategory(categoriesArray, currentCategory){
	//Returns true if at least one element in this array satisfies the provided testing function.
		return categoriesArray.some(function(c){ return c.title===currentCategory})
}
