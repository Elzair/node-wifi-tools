var assert       = require('assert')
  , co_mocha     = require('co-mocha')
  , nsh_is_parse = require(__dirname+'/../lib/netsh_interface_ipv4_show_subinterfaces_parser')
  ;

describe('netsh interface ipv4 show subinterfaces', function() {
  var info = null;

  beforeEach(function *() {
    var test_output = [
        ''
      , '   MTU  MediaSenseState   Bytes In  Bytes Out  Interface'
      , '------  ---------------  ---------  ---------  -------------'
      , '4294967295                1          0      27509  Loopback Pseudo-Interface 1'
      , '  1488                1   65177881   28030327  Wireless Network Connection'
      , '  1500                5          0          0  Local Area Connection'
      , '  1500                5          0          0  Local Area Connection 2'
    ].join('\n');

    info = nsh_is_parse(test_output);
  });

  describe('interfaces', function() {
    it('should contain the proper MTU for the interface', function *() {
      assert.equal(info.wireless_network_connection.mtu, '1488');
    });

    it('should contain the proper Media Sense State for the interface', function *() {
      assert.equal(info.wireless_network_connection.media_sense_state, '1');
    });

    it('should contain the proper number of inputted bytes for the interface', function *() {
      assert.equal(info.wireless_network_connection.bytes_in, '65177881');
    });

    it('should contain the proper number of outputted bytes for the interface', function *() {
      assert.equal(info.wireless_network_connection.bytes_out, '28030327');
    });
  });
});
