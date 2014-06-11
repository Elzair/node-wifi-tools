
describe('node-wifi-tools', function() {
  var assert = require('assert')
    , nwtool = require(__dirname + '/../')
    , os     = require('os')
    ;

  describe('get_info()', function() {
    it('should have an out object with subproperties depending on OS', function(done) {
      nwtool.get_info(function(err, out) {
        assert.equal(typeof out, 'object');

        if (os.platform() === 'linux') {
          assert.equal(err, null);
          assert.equal(out.hasOwnProperty('network_tool'), true);
        }
        else if (os.platform() === 'darwin') {
          assert.equal(err, null);
          assert.equal(out.hasOwnProperty('airport'), true);
          assert.equal(out.hasOwnProperty('netstat'), true);
        }
        else {
          assert.equal(err, "Unsupported platform: " + os.platform());
          assert.equal(out, null);
        }

        done();
      });
    });
  });
});
