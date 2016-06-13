var express = require('express');
// var router = express.Router();
// var nodemailer = require('nodemailer');
// var wellknown = require('nodemailer-wellknown');
// var secrets = require('../configure/authentication/secrets');

// var config = wellknown('Yahoo', secrets.auth);

// router.post('/send', handleSayHello);

// function handleSayHello(req, res) {

// 	var mailOptions = {
// 	    from: secrets.auth.user, // sender address
// 	    to: secrets.testReciever.email, // list of receivers
// 	    subject: 'Email Example', // Subject line
// 	    text: "HELLO WORLD" //, // plaintext body
// 	};

// 	var transporter = nodemailer.createTransport(config);
// 	transporter.sendMail(mailOptions, function(error, info){
// 		if(error){
// 		    console.log(error);
// 		    res.json({yo: 'error'});
// 		}else{
// 		    console.log('Message sent: ' + info.response);
// 		    res.json({yo: info.response});
// 		};
// 	});
// 	res.json(mailOptions);
// }
