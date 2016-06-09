// app.config(function ($stateProvider) {
//     $stateProvider.state('category', {
//         url: '/:category'
//     })
// })

app.factory('categoryFty', function ($http) {
    return {
        getAllCate: function () {
            $http.get('/api/categories')
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
