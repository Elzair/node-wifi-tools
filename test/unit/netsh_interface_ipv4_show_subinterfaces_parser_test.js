var expect       = require('chai').expect
  , co_mocha     = require('co-mocha')
  , fs           = require('fs')
  , nsh_is_parse = require(__dirname+'/../../lib/netsh_interface_ipv4_show_subinterfaces_parser')
  ;

describe('netsh interface ipv4 show subinterfaces', function() {
  var info = null;

  beforeEach(function *() {
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/netsh_interface_ipv4_show_subinterfaces_parser_data.json', 'utf8')).info.join('\n');
 
    info = nsh_is_parse(test_output);
  });

  describe('interfaces', function() {
    it('should contain the proper MTU for the interface', function *() {
      expect(info).to.have.deep.property('wireless_network_connection.mtu', '1488');
    });

    it('should contain the proper Media Sense State for the interface', function *() {
      expect(info).to.have.deep.property('wireless_network_connection.media_sense_state', '1');
    });

    it('should contain the proper number of inputted bytes for the interface', function *() {
      expect(info).to.have.deep.property('wireless_network_connection.bytes_in', '65177881');
    });

    it('should contain the proper number of outputted bytes for the interface', function *() {
      expect(info).to.have.deep.property('wireless_network_connection.bytes_out', '28030327');
    });
  });
});
