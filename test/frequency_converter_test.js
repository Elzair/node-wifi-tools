var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , convert  = require(__dirname+'/../lib/frequency_converter')
  ;

describe('frequency_converter', function() {
  it('should return the correct frequency', function() {
    assert.deepEqual(convert('36,1'), [5180000000, 40000000]);
  });
});
