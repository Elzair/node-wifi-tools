var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , nw_tools = require(__dirname + '/../')
  , os       = require('os')
  ;

describe('node-wifi-tools', function() {
  describe('get_info_linux()', function() {
    var info;

    it('should have an info object if the system is linux and should throw an error otherwise', function *() {
      if (os.platform() === 'linux') {
        info = yield nw_tools.get_info_linux();
        assert.strictEqual(info.hasOwnProperty('network_tool'), true);
      }
      else {
        try {
          info = yield nw_tools.get_info_linux();
        }
        catch (e) {
          assert.strictEqual(e, 'Platform is not linux');
        }
      }
    });
  });

  describe('get_info_darwin()', function() {
    var info;

    it('should have an info object if the system is darwin and should throw an error otherwise', function *() {
      if (os.platform() === 'darwin') {
        info = yield nw_tools.get_info_darwin();
        assert.strictEqual(info.hasOwnProperty('airport'), true);
        assert.strictEqual(info.hasOwnProperty('netstat'), true);
      }
      else {
        try {
          info = yield nw_tools.get_info_darwin();
        }
        catch (e) {
          assert.strictEqual(e, 'Platform is not darwin');
        }
      }
    });
  });

  describe('get_info_windows()', function() {
    var info;

    it('should have an info object if the system is windows and should throw an error otherwise', function *() {
      if (os.platform() === 'windows') {
        info = yield nw_tools.get_info_windows();
        assert.strictEqual(info.hasOwnProperty('ip_show_address'), true);
        assert.strictEqual(info.hasOwnProperty('wlan_show_interfaces'), true);
        assert.strictEqual(info.hasOwnProperty('wlans_show_networks'), true);
      }
      else {
        try {
          info = yield nw_tools.get_info_windows();
        }
        catch (e) {
          assert.strictEqual(e, 'Platform is not windows');
        }
      }
    });
  });

  describe('get_info()', function() {
    var info;

    it('should have an info object with subproperties depending on OS', function*() {
      info = yield nw_tools.get_info();

      assert.strictEqual(typeof info, 'object');
      switch(os.platform()) {
        case 'linux':
          assert.strictEqual(info.hasOwnProperty('network_tool'), true);
          break;
        case 'darwin':
          assert.strictEqual(info.hasOwnProperty('airport'), true);
          assert.strictEqual(info.hasOwnProperty('netstat'), true);
          break;
        case 'windows':
          assert.strictEqual(info.hasOwnProperty('ip_show_address'), true);
          assert.strictEqual(info.hasOwnProperty('wlan_show_interfaces'), true);
          assert.strictEqual(info.hasOwnProperty('wlans_show_networks'), true);
          break;
        default:
          assert.strictEqual(info, null);
      }
    });

    it('should have an info object with linux properties or throw an error', function*() {
      if (os.platform() === 'linux') {
        info = yield nw_tools.get_info('linux');
        assert.strictEqual(info.hasOwnProperty('network_tool'), true);
      }
      else {
        try {
          info = yield nw_tools.get_info('linux');
        }
        catch (e) {
          assert.strictEqual(e, 'Platform is not linux');
        }
      }
    });

    it('should have an info object with darwin properties or throw an error', function*() {
      if (os.platform() === 'darwin') {
        info = yield nw_tools.get_info('darwin');
        assert.strictEqual(info.hasOwnProperty('network_tool'), true);
      }
      else {
        try {
          info = yield nw_tools.get_info('darwin');
        }
        catch (e) {
          assert.strictEqual(e, 'Platform is not darwin');
        }
      }
    });

    it('should have an info object with windows properties or throw an error', function*() {
      if (os.platform() === 'windows') {
        info = yield nw_tools.get_info('windows');
        assert.strictEqual(info.hasOwnProperty('network_tool'), true);
      }
      else {
        try {
          info = yield nw_tools.get_info('windows');
        }
        catch (e) {
          assert.strictEqual(e, 'Platform is not windows');
        }
      }
    });
  });
});
