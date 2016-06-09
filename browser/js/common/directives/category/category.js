app.factory('categoryFty', function ($http) {

    var selectedCats = null;

    return {
        getAllCats: function () {
            return $http.get('/api/categories')
            .then(function(categories){
                // console.log(categories)
                return categories.data;
            });
        }
    };
});

app.directive('categoryView', function (categoryFty) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'js/common/directives/category/category.html',
        link: function (scope) {
            categoryFty.getAllCats()
            .then(function(categories) {
                scope.categories = categories.map(function(category){
                    return category.title;
                });
            });
        }
    };
});
