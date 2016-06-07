var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/vcab';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/review')(db);

var Review = db.model('review');

describe('Review model', () => {

    let goodReview = {
        text: "Robust, sweet and ruddy, with hints of doe",
        rating: 3
    };
    let longReview = {
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        rating: 3
    };
    let shortReview = {
        text: "too short",
        rating: 3
    };

    let createReview = function(review) {
        return Review.create(review);
    }

    beforeEach(() => db.sync({
        force: true
    }));

    describe('validations', () => {

        it('should accept text between 23 and 250 chars length', (done) => {

            createReview(goodReview)
                .then((createdReview) => {
                    expect(createdReview.rating).to.equal(3)
                    expect(createdReview.text).to.equal(goodReview.text)
                    done();
                });
        });

        //check for limits
        it('should reject with error if too short', () => {
            // Taffy Review: can we jsut validate this in Angular?
            // So it wouldn't even come to the back end
        });
        it('should throw an error if too long', (done) => {
            createReview(longReview)
                .then((createReview) => {
                    // throw new Error ('Promise should have rejected')
                }).catch((err) => {
                    expect(err).to.exist
                    expect(err.message).to.contain("Validation len failed")
                    done();
                })
        });
        it('should throw an error if too short', (done) => {
            createReview(shortReview)
                .then((createReview) => {}).catch((err) => {
                    expect(err).to.exist
                    expect(err.message).to.contain("Validation len failed")
                    done();
                })
        });

    });

});
