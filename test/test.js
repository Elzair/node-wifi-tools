
describe('node-wifi-tools', function() {
  var assert = require('assert')
    , nwtool = require(__dirname + '/../')
    , os     = require('os')
    ;

  describe('get_info()', function() {
    it('should have an info object with subproperties depending on OS', function(done) {
      nwtool.get_info(function(err, info) {
        assert.equal(typeof info, 'object');

        if (os.platform() === 'linux') {
          assert.equal(err, null);
          assert.equal(info.hasOwnProperty('network_tool'), true);
        }
        else if (os.platform() === 'darwin') {
          assert.equal(err, null);
          assert.equal(info.hasOwnProperty('airport'), true);
          assert.equal(info.hasOwnProperty('netstat'), true);
        }
        else {
          assert.equal(err, "Unsupported platform: " + os.platform());
          assert.equal(info, null);
        }

        done();
      });
    });
  });
});
