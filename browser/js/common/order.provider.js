// app.provider('orderProvider', function ($http) {
//     var count = 0;
//
//     function getData(res) {
//         return res.data;
//     }
//
//     function getItems() {
//         return $http.get('/api/order/products')
//             .then(getData)
//             .then(function (items) {
//                 count = items.reduce(function (a, b) {
//                     return a + b.quantity
//                 }, 0)
//             });
//     }
//
//
//
// })
