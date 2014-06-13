var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , nm_parse = require(__dirname+'/../lib/nm_parser')
  ;

describe('nm_parser', function() {
  var info;

  beforeEach(function *() {
    // Sample output from nm-tool
    var test_output = [
      '',
      'NetworkManager Tool',
      '',
      'State: connected (global)',
      '',
      '- Device: wlan0  [rscpublic01] -------------------------------------------------',
      '  Type:              802.11 WiFi',
      '  Driver:            iwlwifi',
      '  State:             connected',
      '  Default:           yes',
      '  HW Address:        3C:A9:F4:08:91:8C',
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
      '    TysonsDesk:      Infra, 2C:B0:5D:9F:1A:92, Freq 2437 MHz, Rate 54 Mb/s, Strength 100 WPA2',
      '    tnAchieves:      Infra, 14:35:8B:11:18:DC, Freq 2462 MHz, Rate 54 Mb/s, Strength 59 WPA WPA2',
      '    *rscpublic01:    Infra, 0E:24:0A:08:91:8C, Freq 5180 MHz, Rate 54 Mb/s, Strength 69',
      '    SoftwareTeam Airport: Infra, 80:EA:96:EE:00:4C, Freq 2412 MHz, Rate 54 Mb/s, Strength 100 WPA2',
      '    rscpublic01:     Infra, 0E:06:0A:08:91:8C, Freq 2437 MHz, Rate 54 Mb/s, Strength 100',
      '    PetNet:          Infra, 40:8B:07:F4:E8:8D, Freq 2462 MHz, Rate 54 Mb/s, Strength 87 WPA WPA2',
      '',
      '  IPv4 Settings:',
      '    Address:         192.168.181.73',
      '    Prefix:          24 (255.255.255.0)',
      '    Gateway:         192.168.181.1',
      '',
      '    DNS:             208.67.222.222',
      '    DNS:             208.67.220.220',
      '',
      '',
      '- Device: eth0 -----------------------------------------------------------------',
      '  Type:              Wired',
      '  Driver:            e1000e',
      '  State:             unavailable',
      '  Default:           no',
      '  HW Address:        74:86:7A:6E:8B:34',
      '',
      '  Capabilities:',
      '    Carrier Detect:  yes',
      '',
      '  Wired Properties',
      '    Carrier:         off',
      '',
      ''
    ].join('\n');
    info = nm_parse(test_output);
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
      assert.equal(info[0].hw_address, '3C:A9:F4:08:91:8C');
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
      assert.equal(info[0].connected_ap, 'rscpublic01');
    });
  });

});
