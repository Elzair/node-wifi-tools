var expect    = require('chai').expect
  , co_mocha  = require('co-mocha')
  , fs        = require('fs')
  , nmt_parse = require(__dirname+'/../../lib/nmtool_parser')
  ;

describe('nmtool_parser', function() {
  var info;

  beforeEach(function *() {
    // Sample output from nm-tool
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/nmtool_parser_data.json', 'utf8')).info.join('\n');
 
    info = nmt_parse(test_output);
  });

  describe('Devices', function() {
    it('should have a devices property', function *() {
      expect(info).to.have.property('devices');
    });

    describe('Wireless Device', function () {
      it('should contain the correct device', function *() {
        expect(info).to.have.deep.property('devices.wlan0');
      });

      it('should display correct device name', function *() {
        expect(info).to.have.deep.property('devices.wlan0.name', 'wlan0');
      });

      it('should display correct device type', function *() {
        expect(info).to.have.deep.property('devices.wlan0.type', '802.11 WiFi');
      });

      it('should display correct driver name', function *() {
        expect(info).to.have.deep.property('devices.wlan0.driver', 'iwlwifi');
      });

      it('should display that it is connected', function *() {
        expect(info).to.have.deep.property('devices.wlan0.state', 'connected');
      });

      it('should display that it the default', function *() {
        expect(info).to.have.deep.property('devices.wlan0.default', 'yes');
      });

      it('should display the correct MAC address', function *() {
        expect(info).to.have.deep.property('devices.wlan0.hw_address', '91:5B:CE:AF:F9:E6');
      });

      it('should display the device supports WEP encryption', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_properties.wep_encryption', 'yes');
      });

      it('should display the device supports WPA encryption', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_properties.wpa_encryption', 'yes');
      });

      it('should display the device supports WPA2 encryption', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_properties.wpa2_encryption', 'yes');
      });

      it('should display the correct connected access point (without the asterisk)', function *() {
        expect(info).to.have.deep.property('devices.wlan0.connected_ap', 'test01');
      });

      it('should display the SSID of the connected network', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_access_points.test01.ssid', 'test01');
      });

      it('should display the network type of the connected network', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_access_points.test01.network_type', 'Infra');
      });

      it('should display the BSSID of the connected network', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_access_points.test01.bssid', '97:70:69:86:A7:9F');
      });

      it('should display the frequency of the connected network', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_access_points.test01.frequency', '5180000000');
      });

      it('should display the rate of the connected network', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_access_points.test01.rate', '54 Mb/s');
      });

      it('should display the strength of the connected network', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_access_points.test01.strength', '69');
      });

      it('should display the number of encryption modes supported by the connected network', function *() {
        expect(info).to.have.deep.property('devices.wlan0.wireless_access_points.test01.encryption');
        expect(info.devices.wlan0.wireless_access_points.test01.encryption).to.have.length.within(0,0);
      });

      it('should display the IPv4 address of the interface', function *() {
        expect(info).to.have.deep.property('devices.wlan0.ipv4_settings.address', '192.168.165.84');
      });

      it('should display the IPv4 prefix of the interface', function *() {
        expect(info).to.have.deep.property('devices.wlan0.ipv4_settings.prefix', '24 (255.255.255.0)');
      });

      it('should display the IPv4 gateway of the interface', function *() {
        expect(info).to.have.deep.property('devices.wlan0.ipv4_settings.gateway', '192.168.191.1');
      });

      it('should display the first DNS server for the interface', function *() {
        expect(info).to.have.deep.property('devices.wlan0.ipv4_settings.dns', '207.68.222.222');
      });

      it('should display the second DNS server for the interface', function *() {
        expect(info).to.have.deep.property('devices.wlan0.ipv4_settings.dns_1', '207.68.220.220');
      });
    });
  });

  describe('Connected Devices', function() {
    it('should have a property for connected devices', function *() {
      expect(info).to.have.property('connected_devices');
    });
    
    it('should have the correct connected devices', function *() {
      expect(info).to.have.deep.property('connected_devices[0]', 'wlan0');
    });
  });
});
