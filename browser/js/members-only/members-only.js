app.config(function ($stateProvider) {

    $stateProvider
        .state('myAccount', {
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
                },
                orderedItems: function (CartFactory) {
                    return CartFactory.getItems()
                }
            }
        })
        .state('myAccount.oneOrder', {
            templateUrl: 'js/members-only/one-order.html'
        })

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

app.controller('MemberCtrl', function ($scope, user, orderedItems) {
    $scope.user = user;
    $scope.orderedItems = orderedItems;
})
