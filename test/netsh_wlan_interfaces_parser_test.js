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
      , 'There is 1 interface on the system: '
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

  it('should display correct interface name', function *() {
    assert.equal(info[0].name, 'Wireless Network Connection');
  });

  it('should display correct interface description', function *() {
    assert.equal(info[0].description, 'Intel(R) Centrino(R) Ultimate-N 6300 AGN');
  });

  it('should display correct interface GUID', function *() {
    assert.equal(info[0].guid, 'c120524d-ecfd-40f5-91cf-70b301342d42');
  });

  it('should display correct physical address', function *() {
    assert.equal(info[0].physical_address, '91:5b:ce:af:f9:e6');
  });

  it('should display correct interface state', function *() {
    assert.equal(info[0].state, 'connected');
  });

  it('should display correct SSID', function *() {
    assert.equal(info[0].ssid, 'test01');
  });

  it('should display correct BSSID', function *() {
    assert.equal(info[0].bssid, 'f9:bd:d1:5e:f8:66');
  });

  it('should display correct network type', function *() {
    assert.equal(info[0].network_type, 'Infrastructure');
  });

  it('should display correct radio type', function *() {
    assert.equal(info[0].radio_type, '802.11n');
  });

  it('should display correct authentication', function *() {
    assert.equal(info[0].authentication, 'WPA2-Enterprise');
  });

  it('should display correct cipher', function *() {
    assert.equal(info[0].cipher, 'CCMP');
  });

  it('should display correct channel', function *() {
    assert.equal(info[0].channel, '36');
  });

  it('should display correct receive rate', function *() {
    assert.equal(info[0].receive_rate, '300');
  });

  it('should display correct transmit rate', function *() {
    assert.equal(info[0].transmit_rate, '300');
  });

  it('should display correct signal', function *() {
    assert.equal(info[0].signal, '99%');
  });

  it('should display correct profile', function *() {
    assert.equal(info[0].profile, 'test01');
  });

  it('should display correct hosted network status', function *() {
    assert.equal(info[0].hosted_network_status, 'Not started');
  });
});
