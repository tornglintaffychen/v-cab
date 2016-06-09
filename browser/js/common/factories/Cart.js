// Factory

// communicates between main page and the cart icon overlay
app.factory('CartFactory', function ($http) {
    function getData(response) {
        return response.data;
    }

    var productList;
    var currentCartId;

    return {
        // tc: when the 1st item is added to cart
        createOrder: function () {
            $http.post('/api/orders')
                .then(getData)
                .then(function (data) {
                    currentCartId = data.id;
                    productList = data.productList;
                })
        },

        // tc: get order by id
        getOrder: function (orderId) {
            $http.get('/api/orders/' + orderId)
                .then(getData)
                .then(function (data) {
                    productList = data.productList;
                })
        },

        // have a variable to show cart count
        itemCount: function () {
            return productList.reduce(function (a, b) {
                return b.productQty + a
            }, 0)
        },

        // tc: if there's id exist, update, if not, create one
        updateCart: function (orderId) {
            $http.put('/api/orders/' + orderId)
                .then(getData)
                .then(function (data) {
                    productList = data.productList;
                })
        },

        // if the user clear the cart, we delete that spot in the database
        cleanUpCart: function (orderId) {
            $http.delete('api/orders/' + orderId)
        },

        getProductList: function () {
            return productList
        },

        getCurrentCartId: function () {
            return currentCartId;
        }
    }
})
