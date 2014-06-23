var assert     = require('assert')
  , co_mocha   = require('co-mocha')
  , nksp_parse = require(__dirname + '/../lib/networksetup_parser')
  , os         = require('os')
  ;

describe('networksetup_parser', function() {
  var info;

  before(function *() {
    var test_output = 'Active MTU: 1500 (Current Setting: 1500)';
    info = nksp_parse(test_output);
  });

  it('should contain the correct MTU', function *() {
    assert.strictEqual(info.mtu, '1500');
  });
});
