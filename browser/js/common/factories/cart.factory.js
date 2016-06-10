// Factory

// communicates between main page and the cart icon overlay
app.factory('CartFactory', function ($http) {
    
    function getData(response) {
        return response.data;
    }

    function getOrder (orderId) {
        return $http.get('/api/orders/' + orderId)
                .then(getData); 
    }

    function getItems (orderId) {
        return $http.get('/api/orders/' + orderId)
                .then(getData); 
    }

    return {
        getOrder: getOrder, 
        getItems: getItems
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
