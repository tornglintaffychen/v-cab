'use strict'

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var secrets = require('../configure/authentication/secrets');
var Order = require('../../db').Order;
var Product = require('../../db').Product;

function formatText(name, orderId) {
	return `Thankyou ${name}!
			You're is being processed!
			View order: # ${orderId} 
			made autoinsertdate
			`;
}

function changeOrderStatus(orderId) {
	return Order.update(
		{status: "processing"},
		{
		where:{
			id:orderId
		}
	});
}

function findAndUpdate (orderedProductQuantity, id) {
	return Product.findById(id)
			.then(function(product) {
				var updatedInventory = product.inventory - orderedProductQuantity;
				console.log("this many were there", product.title,  product.inventory);
				console.log("now there are this many", product.title, updatedInventory);
				return product.update({inventory: updatedInventory});
			});
}

function updateProductInventory(products) {
	var orderedProductQuantity;
	return products.map(function(orderedProduct) {
			orderedProductQuantity = orderedProduct.quantity;
			console.log("this many orderd", orderedProduct.title, orderedProductQuantity)
			return findAndUpdate(orderedProductQuantity, orderedProduct.productId);
	});
}

router.post('/orderConfirmation', function (req, res, next) {

	var mailOptions = {
	    from: secrets.auth.user, // sender address
	    to: req.body.email, // list of receivers
	    subject: 'Email Example', // Subject line
	    text: formatText(req.body.name, req.session.orderId) //, // plaintext body
	};

	var smtpTransport = nodemailer.createTransport({
		service: "gmail", 
		auth: secrets.auth});

	smtpTransport.sendMail(mailOptions, function(error, info){
		if(error){
		    console.log(error);
		    res.json({yo: 'error'});
		}else{
		    console.log('Message sent: ' + info.response);
		    res.json({yo: info.response});
		};
	});

	//change order to processing
	changeOrderStatus(req.session.orderId)
	.then(function(order){
		//remove orderid from session
		req.session.orderId = null;
		//subtract ordered products from product inventory
		//should throw error if negative amount
		var products = updateProductInventory(req.body.products);
		return Promise.all(products);
	}).then(function(product){
		res.sendStatus(200);
	});
	

});

//note: look up sendgrid

module.exports = router;