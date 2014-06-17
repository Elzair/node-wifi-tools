var assert        = require('assert')
  , co_mocha      = require('co-mocha')
  , nsh_wn_parse = require(__dirname+'/../lib/netsh_wlan_networks_parser')
  ;

describe('netsh_wlan_networks_parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = [
        ' '
      , 'Interface name : Wireless Network Connection '
      , 'There are 6 networks currently visible. '
      , ''
      , 'SSID 1 : MyTestAp'
      , '    Network type            : Infrastructure'
      , '    Authentication          : WPA2-Personal'
      , '    Encryption              : CCMP '
      , '    BSSID 1                 : da:d9:b1:ed:58:78'
      , '         Signal             : 63%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 11 '
      , '         Basic rates (Mbps) : 1 2'
      , '         Other rates (Mbps) : 5.5 6 9 11 12 18 24 36 48 54'
      , ''
      , 'SSID 2 : RobertsDesk'
      , '    Network type            : Infrastructure'
      , '    Authentication          : WPA2-Personal'
      , '    Encryption              : CCMP '
      , '    BSSID 1                 : a8:91:3c:91:4a:90'
      , '         Signal             : 99%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 6 '
      , '         Basic rates (Mbps) : 6.5 16 19.5 117'
      , '         Other rates (Mbps) : 18 19.5 24 36 39 48 54 156'
      , ''
      , 'SSID 3 : test01'
      , '    Network type            : Infrastructure'
      , '    Authentication          : Open'
      , '    Encryption              : None '
      , '    BSSID 1                 : f9:bd:d1:5e:f8:66'
      , '         Signal             : 99%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 6 '
      , '         Basic rates (Mbps) : 11'
      , '         Other rates (Mbps) : 1 2 5.5 6 9 12 18 24 36 48 54'
      , '    BSSID 2                 : ab:60:0c:b5:ad:9a'
      , '         Signal             : 81%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 36 '
      , '         Basic rates (Mbps) : 6 12 24'
      , '         Other rates (Mbps) : 9 18 36 48 54'
      , ''
      , 'SSID 4 : DevTeam'
      , '    Network type            : Infrastructure'
      , '    Authentication          : WPA2-Personal'
      , '    Encryption              : CCMP '
      , '    BSSID 1                 : 4b:98:6e:ed:ff:e3'
      , '         Signal             : 99%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 1 '
      , '         Basic rates (Mbps) : 1 2 5.5 11'
      , '         Other rates (Mbps) : 6 9 12 18 24 36 48 54'
      , '    BSSID 2                 : a5:f2:ef:aa:5b:cd'
      , '         Signal             : 88%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 149 '
      , '         Basic rates (Mbps) : 6 12 24'
      , '         Other rates (Mbps) : 9 18 36 48 54'
      , ''
      , 'SSID 5 : test02'
      , '    Network type            : Infrastructure'
      , '    Authentication          : WPA2-Enterprise'
      , '    Encryption              : CCMP '
      , '    BSSID 1                 : 6b:57:69:a8:70:e8'
      , '         Signal             : 99%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 36 '
      , '         Basic rates (Mbps) : 24 39 156'
      , '         Other rates (Mbps) : 18 19.5 36 48 54'
      , '    BSSID 2                 : fb:3d:4e:d9:9b:c4'
      , '         Signal             : 99%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 6 '
      , '         Basic rates (Mbps) : 11'
      , '         Other rates (Mbps) : 1 2 5.5 6 9 12 18 24 36 48 54'
      , ''
      , 'SSID 6 : MyNet'
      , '    Network type            : Infrastructure'
      , '    Authentication          : WPA2-Personal'
      , '    Encryption              : CCMP '
      , '    BSSID 1                 : b0:aa:09:ab:a5:82'
      , '         Signal             : 96%  '
      , '         Radio type         : 802.11n'
      , '         Channel            : 11 '
      , '         Basic rates (Mbps) : 1 2 5.5 11'
      , '         Other rates (Mbps) : 6 9 12 18 24 36 48 54'
      , ''
    ].join('\n');

    info = nsh_wn_parse(test_output);
  });

  describe('Overview', function() {
    it('should contain 6 entries', function *() {
      assert.equal(info.length, 6);
    });
  });

  describe('SSID 5 : test01', function() {
    it('should have a network with SSID "test01"', function *() {
      assert.equal(info[2].ssid, 'test01');
    });

    it('should have the correct network type', function *() {
      assert.equal(info[2].network_type, 'Infrastructure');
    });

    it('should have the correct authentication', function *() {
      assert.equal(info[2].authentication, 'Open');
    });

    it('should have the correct encryption type', function *() {
      assert.equal(info[2].encryption, 'None');
    });

    it('should have the correct number of BSSIDs', function *() {
      assert.equal(info[2].bssids.length, 2);
    });

    it('should have a BSSID with the correct MAC address', function *() {
      assert.equal(info[2].bssids[0].hw_address, 'f9:bd:d1:5e:f8:66');
    });

    it('should have a BSSID with the correct signal strength', function *() {
      assert.equal(info[2].bssids[0].signal, '99%');
    });

    it('should have a BSSID with the correct radio type', function *() {
      assert.equal(info[2].bssids[0].radio_type, '802.11n');
    });

    it('should have a BSSID with the correct channel', function *() {
      assert.equal(info[2].bssids[0].channel, '6');
    });

    it('should have a BSSID with the correct basic rates', function *() {
      assert.equal(info[2].bssids[0].basic_rates, '11');
    });

    it('should have a BSSID with the correct other rates', function *() {
      assert.equal(info[2].bssids[0].other_rates, '1 2 5.5 6 9 12 18 24 36 48 54');
    });
  })
});
