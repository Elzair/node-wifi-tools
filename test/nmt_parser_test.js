var assert    = require('assert')
  , co_mocha  = require('co-mocha')
  , nmt_parse = require(__dirname+'/../lib/nmt_parser')
  ;

describe('nmt_parser', function() {
  var info;

  beforeEach(function *() {
    // Sample output from nm-tool
    var test_output = [
      '',
      'NetworkManager Tool',
      '',
      'State: connected (global)',
      '',
      '- Device: wlan0  [test01] -------------------------------------------------',
      '  Type:              802.11 WiFi',
      '  Driver:            iwlwifi',
      '  State:             connected',
      '  Default:           yes',
      '  HW Address:        91:5B:CE:AF:F9:E6',
      '',
      '  Capabilities:',
      '    Speed:           243 Mb/s',
      '',
      '  Wireless Properties',
      '    WEP Encryption:  yes',
      '    WPA Encryption:  yes',
      '    WPA2 Encryption: yes',
      '',
      '  Wireless Access Points (* = current AP)',
      '    StevesDesk:      Infra, 53:7C:A0:87:41:DB, Freq 2437 MHz, Rate 54 Mb/s, Strength 100 WPA2',
      '    myTestAP:      Infra, 66:7C:CF:7E:48:EF, Freq 2462 MHz, Rate 54 Mb/s, Strength 59 WPA WPA2',
      '    *test01:    Infra, 97:70:69:86:A7:9F, Freq 5180 MHz, Rate 54 Mb/s, Strength 69',
      '    DevTeam: Infra, 2D:A6:02:B0:BF:82, Freq 2412 MHz, Rate 54 Mb/s, Strength 100 WPA2',
      '    test02:     Infra, F9:BD:D1:5E:F8:66, Freq 2437 MHz, Rate 54 Mb/s, Strength 100',
      '    TestNet:          Infra, 42:62:87:4E:F8:2C, Freq 2462 MHz, Rate 54 Mb/s, Strength 87 WPA WPA2',
      '',
      '  IPv4 Settings:',
      '    Address:         192.168.165.84',
      '    Prefix:          24 (255.255.255.0)',
      '    Gateway:         192.168.191.1',
      '',
      '    DNS:             207.68.222.222',
      '    DNS:             207.68.220.220',
      '',
      '',
      '- Device: eth0 -----------------------------------------------------------------',
      '  Type:              Wired',
      '  Driver:            e1000e',
      '  State:             unavailable',
      '  Default:           no',
      '  HW Address:        30:EC:7A:7D:44:81',
      '',
      '  Capabilities:',
      '    Carrier Detect:  yes',
      '',
      '  Wired Properties',
      '    Carrier:         off',
      '',
      ''
    ].join('\n');
    info = nmt_parse(test_output);
  });

  describe('Wireless Device', function () {
    it('should display correct device name', function *() {
      assert.equal(info[0].name, 'wlan0');
    });

    it('should display correct device type', function *() {
      assert.equal(info[0].type, '802.11 WiFi');
    });

    it('should display correct driver name', function *() {
      assert.equal(info[0].driver, 'iwlwifi');
    });

    it('should display that it is connected', function *() {
      assert.equal(info[0].state, 'connected');
    });

    it('should display that it the default', function *() {
      assert.equal(info[0].default, 'yes');
    });

    it('should display the correct MAC address', function *() {
      assert.equal(info[0].hw_address, '91:5B:CE:AF:F9:E6');
    });

    it('should display the device supports WEP encryption', function *() {
      assert.equal(info[0].wireless_properties.wep_encryption, 'yes');
    });

    it('should display the device supports WPA encryption', function *() {
      assert.equal(info[0].wireless_properties.wpa_encryption, 'yes');
    });

    it('should display the device supports WPA2 encryption', function *() {
      assert.equal(info[0].wireless_properties.wpa2_encryption, 'yes');
    });

    it('should display the correct connected access point (without the asterisk)', function *() {
      assert.equal(info[0].connected_ap, 'test01');
    });

    it('should display the SSID of the connected network', function *() {
      assert.equal(info[0].wireless_access_points.test01.ssid, 'test01');
    });

    it('should display the network type of the connected network', function *() {
      assert.equal(info[0].wireless_access_points.test01.network_type, 'Infra');
    });

    it('should display the BSSID of the connected network', function *() {
      assert.equal(info[0].wireless_access_points.test01.bssid, '97:70:69:86:A7:9F');
    });

    it('should display the frequency of the connected network', function *() {
      assert.equal(info[0].wireless_access_points.test01.frequency, '5180 MHz');
    });

    it('should display the rate of the connected network', function *() {
      assert.equal(info[0].wireless_access_points.test01.rate, '54 Mb/s');
    });

    it('should display the strength of the connected network', function *() {
      assert.equal(info[0].wireless_access_points.test01.strength, '69');
    });

    it('should display the encryption modes of the connected network', function *() {
      assert.equal(info[0].wireless_access_points.test01.encryption, false);
    });

    it('should display the IPv4 address of the interface', function *() {
      assert.equal(info[0].ipv4_settings.address, '192.168.165.84');
    });

    it('should display the IPv4 prefix of the interface', function *() {
      assert.equal(info[0].ipv4_settings.prefix, '24 (255.255.255.0)');
    });

    it('should display the IPv4 gateway of the interface', function *() {
      assert.equal(info[0].ipv4_settings.gateway, '192.168.191.1');
    });

    it('should display the first DNS server for the interface', function *() {
      assert.equal(info[0].ipv4_settings.dns, '207.68.222.222');
    });

    it('should display the second DNS server for the interface', function *() {
      assert.equal(info[0].ipv4_settings.dns_1, '207.68.220.220');
    });
  });
});
