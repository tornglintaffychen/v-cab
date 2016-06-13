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
        // EI: I wasn't able to successfully sign up :\
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


//EI: $http.post returns a promise for a response... you should handle either a success or failure
app.factory("SignUp", function ($http) {
    return {
        createUser: function (data) {
            return $http.post('/api/users', data);
        }
    }
})

// EI: see the AuthService's login method to see how you might set it up so that a user signs up and is logged in automatically
/* 
this.login = function (credentials) {
    return $http.post('/login', credentials)
        .then(onSuccessfulLogin) //see below!
        .catch(function () {
            return $q.reject({ message: 'Invalid login credentials.' });
        });
};

function onSuccessfulLogin(response) {
    var data = response.data;
    Session.create(data.id, data.user);
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    return data.user;
}
*/
