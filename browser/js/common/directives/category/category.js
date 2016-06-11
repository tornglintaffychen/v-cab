app.factory('CategoryFactory', function ($http) {
    return {
        getAllCategories: function () {
            return $http.get('/api/categories')
						.then(function(categories){
							return categories.data;
						});
        }
    };
});

app.directive('categoryView', function (CategoryFactory) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'js/common/directives/category/category.html',
        link: function (scope) {
            CategoryFactory.getAllCategories()
            .then(function(categories) {
                scope.categories = categories;
            });
      }
    };
});
