app.config(function ($stateProvider) {

    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: '/js/members-only/members-only.html',
        controller: 'MemberCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        },
        resolve: {
            user: function (MemberFactory) {
                return MemberFactory.getUser()
            }
        }
    });

});

app.factory('MemberFactory', function ($http) {

    function getUser() {
        return $http.get('/api/users/member')
            .then(function (res) {
                return res.data;
            })
    }

    return {
        getUser: getUser
    };

});

app.controller('MemberCtrl', function ($scope, user) {
    $scope.user = user;
})
