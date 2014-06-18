var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , nw_tools = require(__dirname + '/../')
  , os       = require('os')
  ;

describe('node-wifi-tools', function() {
  describe('get_info()', function() {
    var info;

    it('should have an info object with subproperties depending on OS', function*() {
      info = yield nw_tools.get_info();

      assert.strictEqual(typeof info, 'object');
      if (os.platform() === 'linux') {
        assert.strictEqual(info.hasOwnProperty('network_tool'), true);
      }
      else if (os.platform() === 'darwin') {
        assert.strictEqual(info.hasOwnProperty('airport'), true);
        assert.strictEqual(info.hasOwnProperty('netstat'), true);
      }
      else {
        assert.strictEqual(info, null);
      }
    })
  });
});
