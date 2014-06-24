var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , fs       = require('fs')
  , ns_parse = require(__dirname+'/../../lib/netstat_parser')
  ;

describe('netstat_parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/netstat_parser_data.json', 'utf8')).info.join('\n');

    info = ns_parse(test_output);
  });

  describe('Internet', function() {
    it('should contain the default destination', function *() {
      assert.strictEqual(info.internet[0].destination, 'default');
    });

    it('should contain the default gateway', function *() {
      assert.strictEqual(info.internet[0].gateway, '192.168.121.1');
    });

    it('should contain the default flags', function *() {
      assert.strictEqual(info.internet[0].flags, 'UGSc');
    });

    it('should contain the default refs', function *() {
      assert.strictEqual(info.internet[0].refs, '33');
    });

    it('should contain the default use', function *() {
      assert.strictEqual(info.internet[0].use, '0');
    });

    it('should contain the default net interface', function *() {
      assert.strictEqual(info.internet[0].netif, 'en1');
    });

    it('should contain the default expire', function *() {
      assert.strictEqual(info.internet[0].expire, null);
    });
  });
});
