app.factory('ReviewFactory', function ($http, 'ProductFactory', 'UserFactory') {
    //sv (str, str) => string
    var ReviewFactory = {};

    // leaving this in to remind me of my deep shame at this wretched code - kb
    // function parseDate(dateString){
    //     var slicedDate = dateString.slice(0,9);
    //     var year = dateString.slice(0, 4);
    //     var month = dateString.slice(6, 8);
    //     var day = dateString.slice(10, 12);
    //     return month + "/" + day + "/" + year;
    // }

    //kb-priority: 
    ReviewFactory.addReview = function(review){
        return $http.post('/api/reviews')
        .then(function(res){
            console.log('here is the new review res: ', res)
        })
        .catch(function(error){
            console.error("something went wrong with posting your review! ", error)
        })
    }

    ReviewFactory.editReview = function(id){
        return $http.put('/api/reviews/'+ id )
        .then(function(res){
            console.log('here is the update res: ', res)
        })
        .catch(function(error){
            console.error("something went wrong with editing your review! ", error)
        })
    }
    ReviewFactory.removeReview = function(id){
        return $http.delete('/api/reviews/' + id)
        .then(function(res){
            console.log('here is the delete res: ', res)
        })
        .catch(function(error){
            console.error("somethingn went wrong with deleting your review! ", error)
        })
    }
    return ReviewFactory;

}