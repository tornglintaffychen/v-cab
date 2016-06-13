### cartTodo:

** Routes: **
- [x] first time adding an item to cart - create new Order, send info to OrderProduct
- [x] adding an item to an exist cart with orderId - OrderProduct.post
- [x] edit an item inside the cart - OrderProduct.put, findOne using orderId and productId, then update
- [x] delete an item inside the cart - OrderProduct.delete, findOne using orderId and productId, then delete
- [x] check if cart is empty, if (emtpy) - OrderProduct.findAll by orderId, delete them all Order.findById(orderId) then delete it
- [x] ng-model="product.title", ng-model="product.price", <input ng-model="product.quantity" placeholder={{product.quantity}} />
or maybe a dropdown ENUM thing 1-10?
if we type in qty update then use update <button ng-submit="updateItem(product)">update</button>
if we use dropdown, the just use x <button class="glyphicon glyphicon-remove">x</button>
(display in cart)


------
Session:
1. when click "add to cart on a product"
2. ng-click="addToCart(product)" -> $http.post('/api/order/addToCart')
3. in order route, if (req.user) search all order by user.id where status is inCart
4. if no status inCart -> Order.create({userId: req.user.id})
5. if (!req.user) User.create({firstName: Bella, lastName:Swan})
6. then Order.create() that person's id
-----


- [x] check session set up if there's req.user.id - user.id (when sign in)

- [x] how to assign userId for non-signedIn user? how to persist their carts?  
Ashi said it's good to just assign an id even they are not registered, but what is our approach?

- [ ] for displaying the cart, we need to get all rows with the same orderId
(at this moment, we just pretend that price won't change after they put into cart)


- [ ] still need to loop threw all productIds that we get from the Order (include: Product) when findById, so we will have imgs and stuff
