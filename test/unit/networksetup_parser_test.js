var assert     = require('assert')
  , co_mocha   = require('co-mocha')
  , fs         = require('fs')
  , nksp_parse = require(__dirname + '/../../lib/networksetup_parser')
  , os         = require('os')
  ;

describe('networksetup_parser', function() {
  var info;

  before(function *() {
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/networksetup_parser_data.json', 'utf8')).info.join('\n');
 
    info = nksp_parse(test_output);
  });

  it('should contain the correct MTU', function *() {
    assert.strictEqual(info.mtu, '1500');
  });
});
