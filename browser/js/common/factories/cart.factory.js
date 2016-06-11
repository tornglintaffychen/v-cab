// Factory

// communicates between main page and the cart icon overlay

// tc: product view page, add-to-cart needs to use this factory as well (?)

app.factory('CartFactory', function ($http) {
    var itemCount = 0;
    // tc: controller can change the currentCartId (?)
    var userId = null;

    function getData(response) {
        return response.data;
    }

    function getInCartId(userId) {
        $http.get('/api/users/' + userId)
            .then(getData)
            .then(function (user) {
                return user.orders.filter(function (order) {
                    return order.status === "inCart"
                })[0].id
            })
    }

    function getItems(orderId) {
        return $http.get('/api/order/' + orderId + '/products')
            .then(function (response) {
                itemCount = response.data.length;
                return response.data;
            });
    }

    // this function is for the prodcuts / product controller
    function addToCart(product) {
        $http.post('/api/order/addToCart', product)
            .then(getData)

    }

    function removeFromCart(product, orderId) {
        return $http.put('/api/order/' + orderId + '/deleteItem', product)
            .then(getData);
    }

    function getItemCount() {
        return itemCount;
    }

    function updateQty(orderId, product) {
        return $http.put('/api/order/' + orderId + '/product/' + product.productId, product)
            .then(getData);
    }

    function clearCart(orderId) {
        return $http.delete('/api/order/' + orderId)
    }

    function submitOrder() {
        return $http.put('/')
            .then(getData)
    }


    return {
        addToCart: addToCart,
        getItems: getItems,
        getItemCount: getItemCount,
        updateQty: updateQty,
        removeFromCart: removeFromCart,
        submitOrder: submitOrder,
        clearCart: clearCart,
        clearCart: clearCart,
        userId: userId
    }
});
