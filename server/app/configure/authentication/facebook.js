'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var secrets = require('./secrets.js');

module.exports = function (app, db) {
    require('../../../db/models/user')(db);
    var User = db.models.user;
 

    var facebookCredentials = {
        clientID: secrets.facebook.clientID,
        clientSecret: secrets.facebook.clientSecret,
        callbackURL: "/auth/facebook/callback"
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
      
        console.log("FACEBOOK");
        console.dir(User);

        User.create({
                where: {
                    facebook_id: profile.id
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
