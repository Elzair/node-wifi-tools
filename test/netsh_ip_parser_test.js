var assert       = require('assert')
  , co_mocha     = require('co-mocha')
  , nsh_ip_parse = require(__dirname+'/../lib/netsh_ip_parser')
  ;

describe('netsh_ip_parser', function() {
  var info;

  beforeEach(function *() {
    // Sample output from nm-tool
    var test_output = [
     , ''
     , 'Configuration for interface "Local Area Connection* 13"'
     , '    DHCP enabled:                         Yes'
     , '    InterfaceMetric:                      10'
     , ''
     , 'Configuration for interface "Bluetooth Network Connection 4"'
     , '    DHCP enabled:                         Yes'
     , '    InterfaceMetric:                      50'
     , ''
     , 'Configuration for interface "Wireless Network Connection 3"'
     , '    DHCP enabled:                         Yes'
     , '    InterfaceMetric:                      5'
     , ''
     , 'Configuration for interface "Wireless Network Connection 2"'
     , '    DHCP enabled:                         Yes'
     , '    InterfaceMetric:                      5'
     , ''
     , 'Configuration for interface "Wireless Network Connection"'
     , '    DHCP enabled:                         Yes'
     , '    IP Address:                           192.168.131.186'
     , '    Subnet Prefix:                        192.168.131.0/24 (mask 255.255.255.0)'
     , '    Default Gateway:                      192.168.131.1'
     , '    Gateway Metric:                       0'
     , '    InterfaceMetric:                      20'
     , ''
     , 'Configuration for interface "Local Area Connection"'
     , '    DHCP enabled:                         Yes'
     , '    InterfaceMetric:                      5'
     , ''
     , 'Configuration for interface "Loopback Pseudo-Interface 1"'
     , '    DHCP enabled:                         No'
     , '    IP Address:                           127.0.0.1'
     , '    Subnet Prefix:                        127.0.0.0/8 (mask 255.0.0.0)'
     , '    InterfaceMetric:                      50'
     , ''
    ].join('\n');
    info = nsh_ip_parse(test_output);
  });

  describe('Wireless Network Connection', function () {
    it('should contain correct information on Wireless connection', function *() {
      assert.equal(info.hasOwnProperty('wireless_network_connection'), true);
    });

    it('should contain indicator that DHCP is enabled on the interface', function *() {
      assert.equal(info.wireless_network_connection.dhcp_enabled, 'Yes');
    });

    it('should contain correct IP address', function *() {
      assert.equal(info.wireless_network_connection.ip_address, '192.168.131.186');
    });

    it('should contain correct subnet prefix', function *() {
      assert.equal(info.wireless_network_connection.subnet_prefix, '192.168.131.0/24 (mask 255.255.255.0)');
    });

    it('should contain correct default gateway', function *() {
      assert.equal(info.wireless_network_connection.default_gateway, '192.168.131.1');
    });

    it('should contain correct gateway metric', function *() {
      assert.equal(info.wireless_network_connection.gateway_metric, '0');
    });

    it('should contain correct interface metric', function *() {
      assert.equal(info.wireless_network_connection.interfacemetric, '20');
    });
  });
});
