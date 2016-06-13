app.factory('CategoryFactory', function ($http) {

    var currentProducts;
    var currentCategory= {title: "all"};

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

    return {
        getAllCategories: getAllCategories,
        fetchByCategory: fetchByCategory,
				currentCategory
    }

});
