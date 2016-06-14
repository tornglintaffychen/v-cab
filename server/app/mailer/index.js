'use strict'

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var secrets = require('../configure/authentication/secrets');
var Order = require('../../db').Order;

function formatText(name, orderId) {
	return `Thankyou ${name}!
			You're is being processed!
			View order: # ${orderId} 
			made autoinsertdate
			`;
}

function changeOrderStatus() {
	return Order.update(
		{status: "processing"},
		{
		where:{
			id:req.session.orderId
		}
	});
}

function updateProductInventory(products) {

}

router.post('/orderConfirmation', function (req, res) {
	console.log(req.body)
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

	changeOrderStatus()
	.then(function(order){
		//remove order session
		console.log(order)
	});
	// res.json(mailOptions);
});

//sendgrid

module.exports = router;