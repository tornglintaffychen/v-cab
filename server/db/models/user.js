'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('user', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
            //we should put in a default placeholder because we won't be getting the unregistered user until we checkout
            //should we allow numerics here?
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
            //same here
            //should we allow numerics here?
        },
        //possibly modify so that address is model of it's own with 'belongs to one' user and 'belongs to many' orders
        //unless there's a way for address to have sub-types 
        address: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        //do we want to allow address to be null for registered users?
        email: {
            type: Sequelize.STRING
        },
        //we shouldn't allow email to be null
        //we SHOULD require it to be unique? unelss unregistered users are making multiple orders - how would that work . . . 

        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        twitter_id: {
            type: Sequelize.STRING
        },
        facebook_id: {
            type: Sequelize.STRING
        },
        google_id: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
        //how can we hide this so that it isn't accessible from the browser?
    }, {
        instanceMethods: {
            sanitize: function () {
                return _.omit(this.toJSON(), ['password', 'salt']);
                //what exactly does sanitize mean
            },
            correctPassword: function (candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
                //candidate? what do they mean by this. unclear var name
            }
        },
        classMethods: {
            generateSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function (plainText, salt) {
                var hash = crypto.createHash('sha1');
                hash.update(plainText);
                hash.update(salt);
                return hash.digest('hex');
            }
            //should we encrypt the email? we don't want that to be publicly accessible in case of server invasion . . . 
        },
        hooks: {
            beforeValidate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }
            //user should also be able to change email 
        }
    });

//with unregistered users we should have a 30 day time limit to start a return, then we can delete our temp user from the database.
};
