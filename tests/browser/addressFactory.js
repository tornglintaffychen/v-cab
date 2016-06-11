describe('AddressFactory', function() {

	beforeEach(module('vcab'));

	var AddressFactory;
  	var $log;

  	beforeEach(inject(function(_AddressFactory_, _$log_) {
	    AddressFactory = _AddressFactory_;
	    $log = _$log_;
	    sinon.stub($log, 'warn', function() {});
  	}));

  	it('works', function () {
  		expect(AddressFactory).to.be.an('object');
  	});
  
    it('gets FullName', function () {
      expect(AddressFactory.getFullName("sam", "vinci")).to.equal('Sam Vinci');
    });

    // it('turns long address strings into managable address Objects', function (done) {
    //   AddressFactory.formatAddress("1600 Pennsylvania Ave NW, Washington, DC 20500")
    //   .then(function(result) {
    //     expect(result).to.to.be.an('object');
    //     done();
    //   })
    //   .catch(function(err){
    //     done(err);
    // });
});