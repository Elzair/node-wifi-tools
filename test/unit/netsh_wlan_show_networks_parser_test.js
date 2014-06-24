var assert       = require('assert')
  , co_mocha     = require('co-mocha')
  , fs           = require('fs')
  , nsh_wn_parse = require(__dirname+'/../../lib/netsh_wlan_show_networks_parser')
  ;

describe('netsh_wlan_networks_parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/netsh_wlan_show_networks_parser_data.json', 'utf8')).info.join('\n');

    info = nsh_wn_parse(test_output);
  });

  describe('SSID 5 : test01', function() {
    it('should have a network with SSID "test01"', function *() {
      assert.ok(info.hasOwnProperty('test01'));
      assert.strictEqual(info.test01.ssid, 'test01');
    });

    it('should have the correct network type', function *() {
      assert.strictEqual(info.test01.network_type, 'Infrastructure');
    });

    it('should have the correct authentication', function *() {
      assert.strictEqual(info.test01.authentication, 'Open');
    });

    it('should have the correct encryption type', function *() {
      assert.strictEqual(info.test01.encryption, 'None');
    });

    it('should have an access point with the correct BSSID', function *() {
      assert.ok(info.test01.access_points.hasOwnProperty('f9_bd_d1_5e_f8_66'));
      assert.strictEqual(info.test01.access_points.f9_bd_d1_5e_f8_66.bssid, 'f9:bd:d1:5e:f8:66');
    });

    it('should have an access point with the correct signal strength', function *() {
      assert.strictEqual(info.test01.access_points.f9_bd_d1_5e_f8_66.signal, '99%');
    });

    it('should have an access point with the correct radio type', function *() {
      assert.strictEqual(info.test01.access_points.f9_bd_d1_5e_f8_66.radio_type, '802.11n');
    });

    it('should have an access point with the correct channel', function *() {
      assert.strictEqual(info.test01.access_points.f9_bd_d1_5e_f8_66.channel, '6');
    });

    it('should have the correct frequency for the given channel', function *() {
      assert.deepEqual(info.test01.access_points.f9_bd_d1_5e_f8_66.frequency, ["2437000000", ""]);
    });

    it('should have an access point with the correct basic rates', function *() {
      assert.strictEqual(info.test01.access_points.f9_bd_d1_5e_f8_66.basic_rates, '11');
    });

    it('should have an access point with the correct other rates', function *() {
      assert.strictEqual(info.test01.access_points.f9_bd_d1_5e_f8_66.other_rates, '1 2 5.5 6 9 12 18 24 36 48 54');
    });
  })
});
