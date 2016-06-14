'use strict';

app.factory('UserFactory', function ($http) {
    var UserFactory = {};


    function getData(res) {
        return res.data;
    }
//necessary? maybe for admins
    UserFactory.fetchAll = function () {
        return $http.get('/api/users')
            .then(getData);
    };

    UserFactory.fetchById = function (id) {
        return $http.get('/api/users/' + id)
            .then(getData)
            .catch(function (error) {
                console.error(error.message)
            });
    };

    UserFactory.editInfo = function(id){
        return $http.put('/api/users' + id)
        .then(getData)
        .catch(function (error){
            console.error("something went wrong with editing your info!!!" + error)
        });
    };

    return UserFactory;
});