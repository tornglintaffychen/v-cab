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
<<<<<<< HEAD
  let goodReview = {
    text: "Robust, sweet and ruddy, with hints of doe",
    rating: 3
  };
  let longReview = {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 3
  };
  let createReview = function (review){
    return Review.create(review);
  }

  beforeEach(() => db.sync({force:true}));

  describe('add review text', () => {


    it('should accept text between 23 and 250 chars length', (done) => {

      createReview(goodReview)
      .then((createdReview) => {
           expect(createdReview.rating).to.equal(3)
           expect(createdReview.text).to.equal(goodReview.text)
           done();
      });
    });

    //check for limits
    it('should reject with error if too short', ()=>{

    });
    it('should throw an error if too long', (done) => {
      createReview(longReview)
      .then((createReview) => {
        // throw new Error ('Promise should have rejected')
      }).catch((err) => {
        // console.log("This is error:",err.message);
        expect(err).to.exist
        expect(err.message).to.contain("Validation len failed")
        done();
      })
    });

  });

});


//
// describe('User model', function () {
//
//     beforeEach('Sync DB', function () {
//        return db.sync({ force: true });
//     });
//
//     describe('password encryption', function () {
//
//         describe('generateSalt method', function () {
//
//             it('should exist', function () {
//                 expect(User.generateSalt).to.be.a('function');
//             });
//
//             it('should return a random string basically', function () {
//                 expect(User.generateSalt()).to.be.a('string');
//             });
//
//         });
//
//         describe('encryptPassword', function () {
//
//             var cryptoStub;
//             var hashUpdateSpy;
//             var hashDigestStub;
//             beforeEach(function () {
//
//                 cryptoStub = sinon.stub(require('crypto'), 'createHash');
//
//                 hashUpdateSpy = sinon.spy();
//                 hashDigestStub = sinon.stub();
//
//                 cryptoStub.returns({
//                     update: hashUpdateSpy,
//                     digest: hashDigestStub
//                 });
//
//             });
//
//             afterEach(function () {
//                 cryptoStub.restore();
//             });
//
//             it('should exist', function () {
//                 expect(User.encryptPassword).to.be.a('function');
//             });
//
//             it('should call crypto.createHash with "sha1"', function () {
//                 User.encryptPassword('asldkjf', 'asd08uf2j');
//                 expect(cryptoStub.calledWith('sha1')).to.be.ok;
//             });
//
//             it('should call hash.update with the first and second argument', function () {
//
//                 var pass = 'testing';
//                 var salt = '1093jf10j23ej===12j';
//
//                 User.encryptPassword(pass, salt);
//
//                 expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
//                 expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);
//
//             });
//
//             it('should call hash.digest with hex and return the result', function () {
//
//                 var x = {};
//                 hashDigestStub.returns(x);
//
//                 var e = User.encryptPassword('sdlkfj', 'asldkjflksf');
//
//                 expect(hashDigestStub.calledWith('hex')).to.be.ok;
//                 expect(e).to.be.equal(x);
//
//             });
//
//         });
//
//         describe('on creation', function () {
//
//             var encryptSpy;
//             var saltSpy;
//
//             var createUser = function () {
//                 return User.create({ email: 'obama@gmail.com', password: 'potus' });
//             };
//
//             beforeEach(function () {
//                 encryptSpy = sinon.spy(User, 'encryptPassword');
//                 saltSpy = sinon.spy(User, 'generateSalt');
//             });
//
//             afterEach(function () {
//                 encryptSpy.restore();
//                 saltSpy.restore();
//             });
//
//             it('should call User.encryptPassword with the given password and generated salt', function (done) {
//                 createUser().then(function () {
//                     var generatedSalt = saltSpy.getCall(0).returnValue;
//                     expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
//                     done();
//                 });
//             });
//
//             it('should set user.salt to the generated salt', function (done) {
//                createUser().then(function (user) {
//                    var generatedSalt = saltSpy.getCall(0).returnValue;
//                    expect(user.salt).to.be.equal(generatedSalt);
//                    done();
//                });
//             });
//
//             it('should set user.password to the encrypted password', function (done) {
//                 createUser().then(function (user) {
//                     var createdPassword = encryptSpy.getCall(0).returnValue;
//                     expect(user.password).to.be.equal(createdPassword);
//                     done();
//                 });
//             });
//
//         });
//
//         describe('sanitize method', function () {
//
//             var createUser = function () {
//                 return User.create({ email: 'obama@gmail.com', password: 'potus' });
//             };
//
//             it('should remove sensitive information from a user object', function () {
//                 createUser().then(function (user) {
//                     var sanitizedUser = user.sanitize();
//                     expect(user.password).to.be.ok;
//                     expect(user.salt).to.be.ok;
//                     expect(sanitizedUser.password).to.be.undefined;
//                     expect(sanitizedUser.salt).to.be.undefined;
//                 });
//             });
//         });
//
//     });
//
// });
//
=======
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
>>>>>>> ee2fba0bf098bc90ef421851200e88bace815daa
