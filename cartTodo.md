### cartTodo:

** Routes: **
- [ ] first time adding an item to cart - create new Order, send info to OrderProduct
- [ ] adding an item to an exist cart with orderId - OrderProduct.post
- [ ] edit an item inside the cart - OrderProduct.put, findOne using orderId and productId, then update
- [ ] delete an item inside the cart - OrderProduct.delete, findOne using orderId and productId, then delete
- [ ] check if cart is empty, if (emtpy) - OrderProduct.findAll by orderId, delete them all Order.findById(orderId) then delete it
- [ ] check session set up if there's req.session.userId - user.id (when sign in)
- [ ] need to send req.session.userId to front end as the currentUserId
- [ ] how to assign userId for non-signedIn user? how to persist their carts?  
Ashi said it's good to just assign an id even they are not registered, but what is our approach?

- [ ] for displaying the cart, we need to get all rows with the same orderId
(at this moment, we just pretend that price won't change after they put into cart)

- [ ] ng-model="product.title", ng-model="product.price", <input ng-model="product.quantity" placeholder={{product.quantity}} />
or maybe a dropdown ENUM thing 1-10?
if we type in qty update then use update <button ng-submit="updateItem(product)">update</button>
if we use dropdown, the just use x <button class="glyphicon glyphicon-remove">x</button>
(display in cart)
- [ ] still need to loop threw all productIds that we get from the Order (include: Product) when findById, so we will have imgs and stuff
