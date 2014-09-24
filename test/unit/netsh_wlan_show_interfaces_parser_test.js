var expect       = require('chai').expect
  , co_mocha     = require('co-mocha')
  , fs           = require('fs')
  , nsh_wi_parse = require(__dirname+'/../../lib/netsh_wlan_show_interfaces_parser')
  ;

describe('netsh_wlan_interface_parser', function() {
  var info;

  beforeEach(function *() {  
    // Sample output from "netsh wlan show interfaces"
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/netsh_wlan_show_interfaces_parser_data.json', 'utf8')).info.join('\n');

    info = nsh_wi_parse(test_output);
  });

  describe('Devices', function() {
    it('should have a devices property', function *() {
      expect(info).to.have.property('devices');
    });

    describe('Wireless Network Connection', function() {
      it('should contain the correct interface', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection');
      });
       
      it('should display correct device name', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.name', 'Wireless Network Connection');
      });

      it('should display correct device description', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.description', 'Intel(R) Centrino(R) Ultimate-N 6300 AGN');
      });

      it('should display correct device GUID', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.guid', 'c120524d-ecfd-40f5-91cf-70b301342d42');
      });

      it('should display correct physical address', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.physical_address', '91:5b:ce:af:f9:e6');
      });

      it('should display correct device state', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.state', 'connected');
      });

      it('should display correct SSID', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.ssid', 'test01');
      });

      it('should display correct BSSID', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.bssid', 'f9:bd:d1:5e:f8:66');
      });

      it('should display correct network type', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.network_type', 'Infrastructure');
      });

      it('should display correct radio type', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.radio_type', '802.11n');
      });

      it('should display correct authentication', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.authentication', 'WPA2-Enterprise');
      });

      it('should display correct cipher', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.cipher', 'CCMP');
      });

      it('should display correct channel', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.channel', '36');
      });

      it('should display correct receive rate', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.receive_rate', '300');
      });

      it('should display correct transmit rate', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.transmit_rate', '300');
      });

      it('should display correct signal', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.signal', '99%');
      });

      it('should display correct profile', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.profile', 'test01');
      });

      it('should display correct hosted network status', function *() {
        expect(info).to.have.deep.property('devices.wireless_network_connection.hosted_network_status', 'Not started');
      });
    });
  });

  describe('connected_devices', function() {
    it('should have a property for connected devices', function *() {
      expect(info).to.have.property('connected_devices');
    });

    it('should have the correct connected devices', function *() {
      expect(info).to.have.deep.property('connected_devices[0]', 'wireless_network_connection');
    });
  });
});
