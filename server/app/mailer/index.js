'use strict'

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var secrets = require('../configure/authentication/secrets');

function formatText(name, orderId) {
	return `Thankyou ${name}!
			You're has shipped!
			View order: # ${orderId} 
			made autoinsertdate
			`;
}

function changeOrderStatus(arr) {

}
function updateProductInventory(arr) {

}

router.post('/orderConfirmation', function (req, res) {
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
	// res.json(mailOptions);
});

//sendgrid

module.exports = router;