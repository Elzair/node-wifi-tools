var assert     = require('assert')
  , co_mocha   = require('co-mocha')
  , iasd_parse = require(__dirname + '/../lib/ip_addr_show_dev_parser')
  , os         = require('os')
  ;

describe('ip addr show dev', function() {
  describe('wlan0', function() {
    var info = null;

    beforeEach(function *() {
      var test_output = [
          '3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000'
        , '    link/ether 3c:a9:f4:08:91:8c brd ff:ff:ff:ff:ff:ff'
        , '    inet 192.168.115.100/24 brd 192.168.115.255 scope global wlan0'
        , '       valid_lft forever preferred_lft forever'
        , '    inet6 2002:c0a8:6887:0:f1e6:37d:564a:f3b3/64 scope global temporary dynamic '
        , '       valid_lft 2225sec preferred_lft 1625sec'
        , '    inet6 2002:c0a8:6887:0:3ea9:f4ff:fe08:918c/64 scope global dynamic '
        , '       valid_lft 2225sec preferred_lft 1625sec'
        , '    inet6 fe80::3ea9:f4ff:fe08:918c/64 scope link '
        , '       valid_lft forever preferred_lft forever'
      ].join('\n');

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
