var expect   = require('chai').expect
  , co_mocha = require('co-mocha')
  , nw_tools = require(__dirname + '/../../')
  , os       = require('os')
  ;

describe('node-wifi-tools', function() {
  describe('get_info_linux()', function() {
    var info;

    it('should have an info object if the system is linux and should throw an error otherwise', function *() {
      if (os.platform() === 'linux') {
        info = yield nw_tools.get_info_linux();
        expect(info).to.have.property('devices');
        expect(info).to.have.property('connected_devices');
      }
      else {
        try {
          info = yield nw_tools.get_info_linux();
        }
        catch (e) {
          expect(e).to.equal('Platform is not linux');
        }
      }
    });
  });

  describe('get_info_darwin()', function() {
    var info;

    it('should have an info object if the system is darwin and should throw an error otherwise', function *() {
      if (os.platform() === 'darwin') {
        info = yield nw_tools.get_info_darwin();
        expect(info).to.have.property('airport');
        expect(info).to.have.property('route');
      }
      else {
        try {
          info = yield nw_tools.get_info_darwin();
        }
        catch (e) {
          expect(e).to.equal('Platform is not darwin');
        }
      }
    });
  });

  describe('get_info_windows()', function() {
    var info;

    it('should have an info object if the system is windows and should throw an error otherwise', function *() {
      if (os.platform() === 'win32') {
        info = yield nw_tools.get_info_windows();
        expect(info).to.have.property('interfaces');
        expect(info).to.have.property('networks');
      }
      else {
        try {
          info = yield nw_tools.get_info_windows();
        }
        catch (e) {
          expect(e).to.equal('Platform is not windows');
        }
      }
    });
  });

  describe('get_info()', function() {
    var info;

    it('should have an info object with subproperties depending on OS', function*() {
      info = yield nw_tools.get_info();

      expect(info).to.be.an('object');
      switch(os.platform()) {
        case 'linux':
          expect(info).to.have.property('devices');
          expect(info).to.have.property('connected_devices');
          break;
        case 'darwin':
          expect(info).to.have.property('airport');
          expect(info).to.have.property('route');
          break;
        case 'win32':
          expect(info).to.have.property('interfaces');
          expect(info).to.have.property('networks');
          break;
        default:
          expect(e).to.equal(null);
      }
    });

    it('should have an info object with linux properties or throw an error', function*() {
      if (os.platform() === 'linux') {
        info = yield nw_tools.get_info('linux');
        expect(info).to.have.property('devices');
        expect(info).to.have.property('connected_devices');
      }
      else {
        try {
          info = yield nw_tools.get_info('linux');
        }
        catch (e) {
          expect(e).to.equal('Platform is not linux');
        }
      }
    });

    it('should have an info object with darwin properties or throw an error', function*() {
      if (os.platform() === 'darwin') {
        info = yield nw_tools.get_info('darwin');
        expect(info).to.have.property('airport');
        expect(info).to.have.property('route');
      }
      else {
        try {
          info = yield nw_tools.get_info('darwin');
        }
        catch (e) {
          expect(e).to.equal('Platform is not darwin');
        }
      }
    });

    it('should have an info object with windows properties or throw an error', function*() {
      if (os.platform() === 'win32') {
        info = yield nw_tools.get_info('win32');
        expect(info).to.have.property('interfaces');
        expect(info).to.have.property('networks');
      }
      else {
        try {
          info = yield nw_tools.get_info('win32');
        }
        catch (e) {
          expect(e).to.equal('Platform is not windows');
        }
      }
    });

    it('should throw an error for an unsupported platform', function *() {
      try {
        info = yield nw_tools.get_info('plan9');
      }
      catch (e) {
        expect(e).to.equal( 'Unsupported platform: plan9');
      }
    });
  });
});
