app.directive('categoryView', function (CategoryFactory) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/category/category.html',
        link: function (scope) {
            CategoryFactory.getAllCategories()
                .then(function (categories) {
                    scope.categories = categories;
                });
            scope.getProductsForCategory = CategoryFactory.getProductsForCategory
        }
    };
});

app.config(function ($stateProvider) {
    $stateProvider.state('category', {
        url: '/category/:categoryId/:categoryTitle',
        controller: 'CategoryCtrl',
        templateUrl: 'js/catalog/productByCategory.html',
        resolve: {
            filteredProducts: function (CategoryFactory, $stateParams) {
                console.log($stateParams)
                return CategoryFactory.fetchByCategory($stateParams.categoryId)
                    .then(function (category) {
                        return category[0].products
                    })
            },
            allCategories: function (CategoryFactory) {
                return CategoryFactory.getAllCategories()
            },
            currentCategory: function ($stateParams) {
                return $stateParams.categoryTitle;
            }
        }
    })
})

app.controller('CategoryCtrl', function (CategoryFactory, filteredProducts, $scope, allCategories, CartFactory, currentCategory) {
    $scope.filteredProducts = filteredProducts;
    $scope.categories = allCategories;
    $scope.addToCart = CartFactory.addToCart;
    $scope.currentCategory = currentCategory;

})
