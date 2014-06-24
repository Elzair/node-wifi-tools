var assert     = require('assert')
  , co_mocha   = require('co-mocha')
  , fs         = require('fs')
  , iasd_parse = require(__dirname + '/../../lib/ip_addr_show_dev_parser')
  , os         = require('os')
  ;

describe('ip addr show dev', function() {
  describe('wlan0', function() {
    var info = null;

    beforeEach(function *() {
     
      var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/ip_addr_show_dev_parser_data.json', 'utf8')).info.join('\n');
 
      info = iasd_parse(test_output);
    });

    it('should have the proper flags', function *() {
      assert.deepEqual(info.flags, ['BROADCAST', 'MULTICAST', 'UP', 'LOWER_UP']);
    });

    it('should have the correct MTU', function *() {
      assert.strictEqual(info.mtu, '1500');
    });

    it('should have the correct traffic control queueing discipline (i.e. qdisc)', function *() {
      assert.strictEqual(info.qdisc, 'mq');
    });

    it('should have the correct state', function *() {
      assert.strictEqual(info.state, 'UP');
    });

    it('should have the correct Ethernet buffer transmit queue length (i.e. qlen)', function *() {
      assert.strictEqual(info.qlen, '1000');
    });
  });
});
