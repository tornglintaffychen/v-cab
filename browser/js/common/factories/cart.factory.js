// Factory

// communicates between main page and the cart icon overlay

// tc: product view page, add-to-cart needs to use this factory as well (?)

app.factory('CartFactory', function ($http) {
    var count = 0;

    var userId = null;

    function getData(response) {
        return response.data;
    }

    function getInCartId(uId) {
        $http.get('/api/users/' + uId)
            .then(getData)
            .then(function (user) {
                console.log('hi')
                return user.orders.filter(function (order) {
                    return order.status === "inCart"
                })[0].id;
            })
    }

    function getItems() {
        return $http.get('/api/order/products')
            .then(function (response) {
                count = response.data.reduce(function (a, b) {
                    return a + b.quantity
                }, 0)
                return response.data;
            });
    }

    // this function is for the prodcuts / product controller
    function addToCart(product) {
        $http.post('/api/order/addToCart', product)
            .then(function (res) {
                getItems();
                return res.data;
            })

    }

    function deleteItem(product) {
        return $http.put('/api/order/deleteItem', product)
            .then(getData);
    }

    function getCount() {
        return count;
    }

    function editItem(product) {
        return $http.put('/api/order/editItem', product)
            .then(function (res) {
                getItems();
                return res.data;
            })
    }

    function clearCart() {
        return $http.delete('/api/order/');
    }

    function submitOrder() {
        return $http.put('/')
            .then(getData)
    }


    return {
        addToCart: addToCart,
        getItems: getItems,
        getCount: getCount,
        editItem: editItem,
        deleteItem: deleteItem,
        submitOrder: submitOrder,
        clearCart: clearCart,
        getInCartId: getInCartId,
        userId: userId,
        count: count
    }
});
