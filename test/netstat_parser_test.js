var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , ns_parse = require(__dirname+'/../lib/netstat_parser')
  ;

describe('netstat_parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = [
      , 'Routing tables'
      , ''
      , 'Internet:'
      , 'Destination        Gateway            Flags        Refs      Use   Netif Expire'
      , 'default            192.168.121.1      UGSc           33        0     en1'
      , '127                127.0.0.1          UCS             0        0     lo0'
      , '127.0.0.1          127.0.0.1          UH             14   169681     lo0'
      , '169.254            link#5             UCS             0        0     en1'
      , '192.168.121        link#5             UCS            12        0     en1'
      , '192.168.121.1      0:90:b:18:f4:e4    UHLWIir        35       36     en1    246'
      , '192.168.121.55     127.0.0.1          UHS             0       50     lo0'
      , '192.168.121.61     0:90:b:18:f4:e4    UHLWI           0        3     en1    978'
      , '192.168.121.79     0:90:b:18:f4:e4    UHLWIi          1      102     en1   1103'
      , '192.168.121.87     0:90:b:18:f4:e4    UHLWIi          1     1213     en1    978'
      , '192.168.121.109    0:90:b:18:f4:e4    UHLWI           0        8     en1   1167'
      , '192.168.121.134    0:90:b:18:f4:e4    UHLWI           0      343     en1    330'
      , '192.168.121.145    0:90:b:18:f4:e4    UHLWI           0     2032     en1    380'
      , '192.168.121.167    0:90:b:18:f4:e4    UHLWI           0      179     en1    931'
      , '192.168.121.179    0:90:b:18:f4:e4    UHLWI           0        4     en1   1121'
      , '192.168.121.183    0:90:b:18:f4:e4    UHLWI           0      338     en1    566'
      , '192.168.121.207    0:90:b:18:f4:e4    UHLWIi          1      919     en1    914'
      , '192.168.121.255    ff:ff:ff:ff:ff:ff  UHLWbI          0        1     en1'
      , ''
      , 'Internet6:'
      , 'Destination                             Gateway                         Flags         Netif Expire'
      , '::1                                     ::1                             UHL             lo0'
      , 'fe80::%lo0/64                           fe80::1%lo0                     UcI             lo0'
      , 'fe80::1%lo0                             link#1                          UHLI            lo0'
      , 'fe80::%en1/64                           link#5                          UCI             en1'
      , 'fe80::7256:81ff:fe88:cd0f%en1           70:56:81:88:cd:f                UHLI            lo0'
      , 'ff01::%lo0/32                           ::1                             UmCI            lo0'
      , 'ff01::%en1/32                           link#5                          UmCI            en1'
      , 'ff02::%lo0/32                           ::1                             UmCI            lo0'
      , 'ff02::%en1/32                           link#5                          UmCI            en1'
      , '    '
    ].join('\n');

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
