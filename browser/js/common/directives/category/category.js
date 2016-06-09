// app.config(function ($stateProvider) {
//     $stateProvider.state('category', {
//         url: '/:category'
//     })
// })

app.factory('categoryFactory', function ($http) {
    return {
        getAllCategories: function () {
            return $http.get('/api/categories')
        }
    }
})

app.directive('categoryView', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/category/category.html',
        link: function (scope) {

            scope.categories = [
                'ALL', '-O', '+O', 'SMOKED', 'SPIKED', 'INEXPENSIVE', 'premium', 'RARE', 'LIMITED', 'HIGHLY-RATED', 'STYLISH', 'VEGAN'
            ]
        }
    };
});
