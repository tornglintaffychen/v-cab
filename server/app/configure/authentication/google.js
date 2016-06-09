'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var secrets = require('./secrets.js');

module.exports = function (app, db) {
    ///ASHI mad important
    require('../../../db/models/user')(db)
    var User = db.models.user

    var googleCredentials = {
        clientID: secrets.google.clientID,
        clientSecret: secrets.google.clientSecret,
        callbackURL: "http://localhost:1337/auth/google/callback"
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log("?????????????????????????");
        console.log(profile.name.givenName);
        console.log(profile.name.familyName);
        console.log(profile.emails[0].value);
        console.dir(User)

        User.create({
                    google_id: profile.id,   
                    firstName: "taffy",
                    lastName: "Chen"
            })
            .then(function (userToLogin) {
                console.log("userToLogin", userToLogin) 
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.redirect('/');
        });

};
