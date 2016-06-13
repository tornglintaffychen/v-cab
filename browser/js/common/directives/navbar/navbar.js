app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, CartFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [{
                label: 'About us',
                state: 'about'
            }, {
                label: 'Products',
                state: 'products'
            }, {
                label: 'My Account',
                state: 'myAccount',
                auth: true
            }];

            scope.user = null;
            scope.$watch(function () {
                return CartFactory.getCount()
            }, function (val) {
                scope.count = val
            });

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                    $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    // tc-cm: if we don't write the if statement, front end logs error
                    if (user !== null) {
                        scope.user = user;
                        CartFactory.userId = user.id;
                    }
                });
            };

            var removeUser = function () {
                CartFactory.currentUserId = null;
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
