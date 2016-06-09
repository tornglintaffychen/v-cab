var nodemailer = require('nodemailer')
var wellknown = require('nodemailer-wellknown');
var secrets = require('../authentication/secrets')

var config = wellknown('Yahoo', secrets.auth);

var transporter = nodemailer.createTransport(config)
