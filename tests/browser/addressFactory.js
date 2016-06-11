describe('AddressFactory', function() {

	beforeEach(module('FullstackGeneratedApp'));

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


});