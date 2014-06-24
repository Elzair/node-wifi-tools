var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , fcon     = require(__dirname+'/../../lib/frequency_converter')
  ;

describe('frequency_converter', function() {
  describe('channel_to_frequency', function () {
    it('should return the correct frequency', function*() {
      assert.deepEqual(fcon.channel_to_frequency('36,1'), [5180000000, 40000000]);
    });
  });

  describe('frequency_parse', function() {
    it('should return the correct frequency', function *() {
      assert.strictEqual(fcon.frequency_parse('5 Hz'), '5');
      assert.strictEqual(fcon.frequency_parse('60 kHz'), '60000');
      assert.strictEqual(fcon.frequency_parse('700 MHz'), '700000000');
      assert.strictEqual(fcon.frequency_parse('3GHz'), '3000000000');
    });
  });
});
