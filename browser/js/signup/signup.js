app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, SignUp, $state) {

    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;

        SignUp.createUser(signupInfo)
            .then(function () {
                $state.go('login');
            })
            .catch(function () {
                $scope.error = 'Invalid signup credentials.';
            });

    };

});

app.factory("SignUp", function ($http) {
    return {
        createUser: function (data) {
            return $http.post('/api/users', data)
        }
    }
})
