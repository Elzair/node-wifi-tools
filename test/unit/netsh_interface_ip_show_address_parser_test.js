var assert       = require('assert')
  , co_mocha     = require('co-mocha')
  , fs           = require('fs')
  , nsh_ia_parse = require(__dirname+'/../../lib/netsh_interface_ip_show_address_parser')
  ;

describe('netsh_ip_parser', function() {
  var info;

  beforeEach(function *() {
    // Sample output from nm-tool
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/netsh_interface_ip_show_address_parser_data.json', 'utf8')).info.join('\n');
 
    info = nsh_ia_parse(test_output);
  });

  describe('Wireless Network Connection', function () {
    it('should contain correct information on Wireless connection', function *() {
      assert.ok(info.hasOwnProperty('wireless_network_connection'));
    });

    it('should contain the correct name for the connection', function *() {
      assert.strictEqual(info.wireless_network_connection.name, 'Wireless Network Connection');
    });

    it('should contain indicator that DHCP is enabled on the interface', function *() {
      assert.strictEqual(info.wireless_network_connection.dhcp_enabled, 'Yes');
    });

    it('should contain correct IP address', function *() {
      assert.strictEqual(info.wireless_network_connection.ip_address, '192.168.131.186');
    });

    it('should contain correct subnet prefix', function *() {
      assert.strictEqual(info.wireless_network_connection.subnet_prefix, '192.168.131.0/24 (mask 255.255.255.0)');
    });

    it('should contain correct default gateway', function *() {
      assert.strictEqual(info.wireless_network_connection.default_gateway, '192.168.131.1');
    });

    it('should contain correct gateway metric', function *() {
      assert.strictEqual(info.wireless_network_connection.gateway_metric, '0');
    });

    it('should contain correct interface metric', function *() {
      assert.strictEqual(info.wireless_network_connection.interfacemetric, '20');
    });
  });
});
