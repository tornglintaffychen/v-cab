app.factory('categoryFty', function ($http) {
    return {
        getAllCats: function () {
            $http.get('/api/categories')
            .then(function(categories){
                return categories.data;
            });
        }
    };
});

app.directive('categoryView', function (categoryFty) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/category/category.html',
        link: function (scope, categoryFty) {
            console.log(categoryFty);
            scope.categories = categoryFty.getAllCats();
            // scope.categories = [
            //     'ALL', '-O', '+O', 'SMOKED', 'SPIKED', 'INEXPENSIVE', 'premium', 'RARE', 'LIMITED', 'HIGHLY-RATED', 'STYLISH', 'VEGAN'
            // ]
        }
    };
});
