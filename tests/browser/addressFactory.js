describe('AddressFactory', function() {

	beforeEach(module('FullstackGeneratedApp'));

	var AddressFactory;
  	var $log;

  	beforeEach(inject(function(_AddressFactory_, _$log_) {
	    AddressFactory = _AddressFactory_;
	    $log = _$log_;
	    sinon.stub($log, 'warn', function() {});
  	}));

  	it('test', function () {
  		expect(AddressFactory).to.be.an('object');
  	});
  
  
});