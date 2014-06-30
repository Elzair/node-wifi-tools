var assert     = require('assert')
  , co_mocha   = require('co-mocha')
  , fs         = require('fs')
  , rg_parse = require(__dirname + '/../../lib/route_get_parser')
  , os         = require('os')
  ;

describe('route get parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/route_get_parser_data.json', 'utf8')).info.join('\n');
 
    info = rg_parse(test_output);
  });

  it('should contain the correct gateway', function *() {
    assert.strictEqual(info.gateway, '10.0.0.1');
  });

  it('should contain the correct interface', function *() {
    assert.strictEqual(info.interface, 'en1');
  });

  it('should contain the correct flags', function *() {
    assert.deepEqual(info.flags, ['UP', 'GATEWAY', 'DONE', 'STATIC', 'PRCLONING']);
  });
  
  it('should contain the correct recvpipe', function *() {
    assert.strictEqual(info.recvpipe, '0');
  });

  it('should contain the correct sendpipe', function *() {
    assert.strictEqual(info.sendpipe, '0');
  });

  it('should contain the correct ssthresh', function *() {
    assert.strictEqual(info.ssthresh, '0');
  });

  it('should contain the correct rtt_msec', function *() {
    assert.strictEqual(info.rtt_msec, '0');
  });

  it('should contain the correct rttvar', function *() {
    assert.strictEqual(info.rttvar, '0');
  });

  it('should contain the correct hopcount', function *() {
    assert.strictEqual(info.hopcount, '0');
  });

  it('should contain the correct mtu', function *() {
    assert.strictEqual(info.mtu, '1500');
  });

  it('should contain the correct expire', function *() {
    assert.strictEqual(info.expire, '0');
  });
});

