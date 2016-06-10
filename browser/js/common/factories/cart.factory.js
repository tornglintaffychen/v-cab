// Factory

// communicates between main page and the cart icon overlay

// tc: product view page, add-to-cart needs to use this factory as well (?)

app.factory('CartFactory', function ($http) {
    var itemCount = 0;

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

    function removeFromCart() {
        return $http.delete('/api/order/update/' + orderId, {
                product
            })
            .then(getData);
    }

    function getItemCount() {
        return itemCount;
    }

    function increaseQuantity(orderId, product) {
        return $http.put('/api/order/' + orderId + '/product/' + product.productId, {
                product
            })
            .then(getData);
    }

    function addToCart(product) {
        // if (currentCartId) use the same orderId to add row the OrderProduct table
        // else Order.create then add info to OrderProduct table
        return $http.
    }
    return {
        getOrder: getOrder,
        getItems: getItems,
        getItemCount: getItemCount,
        increaseQuantity: increaseQuantity,
        removeFromCart: removeFromCart
    }
});

// app.factory('CartFactory', function ($http) {

//     function getData(response) {
//         return response.data;
//     }

//     var CartFactory = {};

//     CartFactory.productList = [];
//     CartFactory.currentCartId = null;

//     // tc: when the 1st item is added to cart
//     //(arr) =>
//     CartFactory.createOrder = function (products) {
//         $http.post('/api/orders', {
//                 products
//             })
//             .then(getData)
//             .then(function (data) {
//                 CartFactory.currentCartId = data.id;
//                 CartFactory.productList = data.productList;
//             })
//     };

//     // tc: get order by id
//     CartFactory.getOrder = function (orderId) {
//         CartFactory.currentCartId = orderId;
//         return $http.get('/api/orders/' + orderId)
//             .then(getData)
//             .then(function (data) {
//                 CartFactory.actualProduct = data.productInfo;
//                 CartFactory.productList = data.orderInfo.productList;
//                 return CartFactory.productList;
//             })
//     };

//     // have a variable to show cart count
//     CartFactory.itemCount = function () {
//         return CartFactory.productList.reduce(function (a, b) {
//             return b.productQty + a
//         }, 0)
//     };

//     //sv
//     // editQuantity: function (productUpdated, quantity) {
//     //         var index = productList.indexOf(productUpdated)
//     //         productList[index].quantity = productUpdated.quantity;
//     //     }

//     // tc: if there's id exist, update
//     CartFactory.updateCart = function (orderId) {
//         // edit productList
//         //sv-notes to see how it runs
//         $http.put('/api/orders/' + orderId)
//             .then(getData)
//             .then(function (data) {
//                 CartFactory.productList = data.productList;
//             })
//     };

//     // if the user clear the cart, we delete that spot in the database
//     CartFactory.cleanUpCart = function (orderId) {
//         $http.delete('api/orders/' + orderId)
//     };

//     CartFactory.getProductList = function () {
//         return CartFactory.productList
//     };
//     //
//     // CartFactory.getCurrentCartId = function () {
//     //     return CartFactory.currentCartId;
//     // };

//     return CartFactory;
// })
