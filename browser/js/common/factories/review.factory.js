app.factory(ReviewFactory, function ($http) {
    var ReviewFactory = {};

    ReviewFactory.addReview = function(review){
        return $http.post('/api/reviews')
        .then(function(res){
            console.log('here is the new review res: ' + res)
        })
        .catch(function(error){
            console.error("something went wrong with posting your review! "  + error)
        })
    }

    ReviewFactory.editReview = function(id){
        return $http.put('/api/reviews/'+ id )
        .then(function(res){
            console.log('here is the update res: ' + res)
        })
        .catch(function(error){
            console.error("something went wrong with editing your review! " + error)
        })
    }

    ReviewFactory.removeReview = function(id){
        return $http.delete('/api/reviews/' + id)
        .then(function(res){
            console.log('here is the delete res: ' + res)
        })
        .catch(function(error){
            console.error("something went wrong with deleting your review! " + error)
        })
    }

    return ReviewFactory;

<<<<<<< HEAD
})
=======
})
>>>>>>> 0651bf64de0a22b0cd89afc1d1018cfd0b61669b
