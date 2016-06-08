'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var secrets = require('./secrets.js');

module.exports = function (app, db) {

    var User = db.define('user');

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: secrets.facebook.clientID,
        clientSecret: secrets.facebook.clientSecret,
        callbackURL: "http://vcab.testing:1337"
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        User.findOne({
                where: {
                    facebook_id: profile.id
                }
            })
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        facebook_id: profile.id
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.redirect('/');
        });

};
