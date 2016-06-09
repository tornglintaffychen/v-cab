'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('user', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        //possibly modify so that address is model of it's own with 'belongs to one' user and 'belongs to many' orders
        //unless there's a way for address to have sub-types
        address: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        //do we want to allow address to be null for registered users?
        //YI: I think this should definitely be required AND unique, since it's what you'll use to sign up and log users in with
        email: {
            type: Sequelize.STRING
        },
        //YI: allow null?
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
        }
    });
};
