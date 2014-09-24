var expect     = require('chai').expect
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
      expect(info).to.have.property('flags');
      expect(info.flags).to.eql(['BROADCAST', 'MULTICAST', 'UP', 'LOWER_UP']);
    });

    it('should have the correct MTU', function *() {
      expect(info).to.have.property('mtu', '1500');
    });

    it('should have the correct traffic control queueing discipline (i.e. qdisc)', function *() {
      expect(info).to.have.property('qdisc', 'mq');
    });

    it('should have the correct state', function *() {
      expect(info).to.have.property('state', 'UP');
    });

    it('should have the correct Ethernet buffer transmit queue length (i.e. qlen)', function *() {
      expect(info).to.have.property('qlen', '1000');
    });
  });
});
