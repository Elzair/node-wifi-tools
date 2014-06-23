var assert        = require('assert')
  , co_mocha      = require('co-mocha')
  , nsh_wi_parse = require(__dirname+'/../lib/netsh_wlan_interfaces_parser')
  ;

describe('netsh_wlan_interface_parser', function() {
  var info;

  beforeEach(function *() {  
    // Sample output from "netsh wlan show interfaces"
    var test_output = [
        ''
      , 'There is 1 device on the system: '
      , ''
      , '    Name                   : Wireless Network Connection'
      , '    Description            : Intel(R) Centrino(R) Ultimate-N 6300 AGN'
      , '    GUID                   : c120524d-ecfd-40f5-91cf-70b301342d42'
      , '    Physical address       : 91:5b:ce:af:f9:e6'
      , '    State                  : connected'
      , '    SSID                   : test01'
      , '    BSSID                  : f9:bd:d1:5e:f8:66'
      , '    Network type           : Infrastructure'
      , '    Radio type             : 802.11n'
      , '    Authentication         : WPA2-Enterprise'
      , '    Cipher                 : CCMP'
      , '    Connection mode        : Profile'
      , '    Channel                : 36'
      , '    Receive rate (Mbps)    : 300'
      , '    Transmit rate (Mbps)   : 300'
      , '    Signal                 : 99%'
      , '    Profile                : test01'
      , ''
      , '    Hosted network status  : Not started'
      , ''
    ].join('\n'); 

    info = nsh_wi_parse(test_output);
  });

  describe('Devices', function() {
    it('should have a devices property', function *() {
      assert.ok(info.hasOwnProperty('devices'));
    });

    describe('Wireless Network Connection', function() {
      it('should contain the correct interface', function *() {
        assert.ok(info.devices.hasOwnProperty('wireless_network_connection'));
      });
       
      it('should display correct device name', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.name, 'Wireless Network Connection');
      });

      it('should display correct device description', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.description, 'Intel(R) Centrino(R) Ultimate-N 6300 AGN');
      });

      it('should display correct device GUID', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.guid, 'c120524d-ecfd-40f5-91cf-70b301342d42');
      });

      it('should display correct physical address', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.physical_address, '91:5b:ce:af:f9:e6');
      });

      it('should display correct device state', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.state, 'connected');
      });

      it('should display correct SSID', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.ssid, 'test01');
      });

      it('should display correct BSSID', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.bssid, 'f9:bd:d1:5e:f8:66');
      });

      it('should display correct network type', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.network_type, 'Infrastructure');
      });

      it('should display correct radio type', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.radio_type, '802.11n');
      });

      it('should display correct authentication', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.authentication, 'WPA2-Enterprise');
      });

      it('should display correct cipher', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.cipher, 'CCMP');
      });

      it('should display correct channel', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.channel, '36');
      });

      it('should display correct receive rate', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.receive_rate, '300');
      });

      it('should display correct transmit rate', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.transmit_rate, '300');
      });

      it('should display correct signal', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.signal, '99%');
      });

      it('should display correct profile', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.profile, 'test01');
      });

      it('should display correct hosted network status', function *() {
        assert.strictEqual(info.devices.wireless_network_connection.hosted_network_status, 'Not started');
      });
    });
  });

  describe('connected_devices', function() {
    it('should have a property for connected devices', function *() {
      assert.ok(info.hasOwnProperty('connected_devices'));
    });

    it('should have the correct connected devices', function *() {
      assert.deepEqual(info.connected_devices, ['wireless_network_connection']);
    });
  });
});
