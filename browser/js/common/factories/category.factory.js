app.factory('CategoryFactory', function ($http) {

    var currentProducts;
    var currentCategory;

    function getAllCategories() {
        return $http.get('/api/categories')
            .then(function (categories) {
                return categories.data;
            });
    };

    function fetchByCategory(id) {
        return $http.get('/api/categories/' + id)
            .then(function (res) {
                return res.data
            });
    };

    function getProductsForCategory(category) {
        currentProducts = category.products;
    };

    function getCurrentProducts() {
        return currentProducts;
    };

    return {
        getAllCategories: getAllCategories,
        getProductsForCategory: getProductsForCategory,
        getCurrentProducts: getCurrentProducts,
        fetchByCategory: fetchByCategory
    }

});
