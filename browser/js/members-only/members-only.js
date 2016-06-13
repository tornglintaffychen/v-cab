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

    function getOrder(id) {
        return $http.get('/api/order/' + id)
    }
    return {
        getUser: getUser,
        getOrder: getOrder
    };

});

app.controller('MemberCtrl', function ($scope, user, MemberFactory, $state) {
    $scope.user = user;
    $scope.goToOrder = function (id) {
        MemberFactory.getOrder(id)
            .then(function (res) {
                $scope.orderedItems = res.data;
                $state.go('myAccount.oneOrder')
            })
    }
})
