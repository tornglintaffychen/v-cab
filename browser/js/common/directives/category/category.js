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
//YI: I don't think this should be a directive. bascially if you want to filter all the products by a category then all you really need is the same thing as the products state, and you can add a filtering function. this would be very repetitive otherwise.
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
