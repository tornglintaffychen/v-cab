// Factory

// communicates between main page and the cart icon overlay

// tc: product view page, add-to-cart needs to use this factory as well (?)

app.factory('CartFactory', function ($http) {
    var itemCount = 0;
    // tc: controller can change the currentCartId (?)
    var currentCartId = null;

    function getData(response) {
        return response.data;
    }

    function getOrder(orderId) {
        return $http.get('/api/order/' + orderId)
            .then(getData);
    }

    function getItems(orderId) {
        return $http.get('/api/order/' + orderId + '/products')
            .then(function (response) {
                itemCount = response.data.length;
                return response.data;
            });
    }


    function removeFromCart(product, orderId) {
        console.log("p: ", product, "id: ", orderId)

        return $http.put('/api/order/' + orderId + '/deleteItem',
                product)
            .then(getData);
    }

    function getItemCount() {
        return itemCount;
    }

    function updateQty(orderId, product) {
        return $http.put('/api/order/' + orderId + '/product/' + product.productId, product)
            .then(getData);
    }

    function addToCart(product) {
        // if (currentCartId) use the same orderId to add row the OrderProduct table
        // else Order.create then add info to OrderProduct table

    }

    function submitOrder() {

    }

    return {
        getOrder: getOrder,
        getItems: getItems,
        getItemCount: getItemCount,
        updateQty: updateQty,
        removeFromCart: removeFromCart,
        currentCartId: currentCartId,
        submitOrder: submitOrder
    }
});
