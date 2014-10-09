var expect   = require('chai').expect
  , co_mocha = require('co-mocha')
  , fcon     = require(__dirname+'/../../lib/frequency_converter')
  ;

describe('frequency_converter', function() {
  describe('channel_to_frequency', function () {
    it('should return the correct frequency', function*() {
      expect(fcon.channel_to_frequency('36,1')).to.eql(['5180000000', '40000000']);
    });
  });

  describe('frequency_parse', function() {
    it('should return the correct frequency', function *() {
      expect(fcon.frequency_parse('5 Hz')).to.equal('5');
      expect(fcon.frequency_parse('60 kHz')).to.equal('60000');
      expect(fcon.frequency_parse('700 MHz')).to.equal('700000000');
      expect(fcon.frequency_parse('3GHz')).to.equal('3000000000');
    });
  });
});
