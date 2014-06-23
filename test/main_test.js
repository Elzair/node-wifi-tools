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
        assert.ok(info.hasOwnProperty('devices'));
        assert.ok(info.hasOwnProperty('connected_devices'));
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
        assert.ok(info.hasOwnProperty('airport'));
        assert.ok(info.hasOwnProperty('netstat'));
        assert.ok(info.hasOwnProperty('networksetup'));
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
        assert.ok(info.hasOwnProperty('interfaces'));
        assert.ok(info.hasOwnProperty('networks'));
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
          assert.ok(info.hasOwnProperty('devices'));
          assert.ok(info.hasOwnProperty('connected_devices'));
          break;
        case 'darwin':
          assert.ok(info.hasOwnProperty('airport'));
          assert.ok(info.hasOwnProperty('netstat'));
          assert.ok(info.hasOwnProperty('networksetup'));
          break;
        case 'windows':
          assert.ok(info.hasOwnProperty('interfaces'));
          assert.ok(info.hasOwnProperty('networks'));
          break;
        default:
          assert.strictEqual(info, null);
      }
    });

    it('should have an info object with linux properties or throw an error', function*() {
      if (os.platform() === 'linux') {
        info = yield nw_tools.get_info('linux');
        assert.ok(info.hasOwnProperty('devices'));
        assert.ok(info.hasOwnProperty('connected_devices'));
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
        assert.ok(info.hasOwnProperty('airport'));
        assert.ok(info.hasOwnProperty('netstat'));
        assert.ok(info.hasOwnProperty('networksetup'));
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
        assert.ok(info.hasOwnProperty('interfaces'));
        assert.ok(info.hasOwnProperty('networks'));
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
