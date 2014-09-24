var expect     = require('chai').expect
  , co_mocha   = require('co-mocha')
  , fs         = require('fs')
  , rg_parse   = require(__dirname + '/../../lib/route_get_parser')
  , os         = require('os')
  ;

describe('route get parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/route_get_parser_data.json', 'utf8')).info.join('\n');
 
    info = rg_parse(test_output);
  });

  it('should contain the correct gateway', function *() {
    expect(info).to.have.property('gateway', '10.0.0.1');
  });

  it('should contain the correct interface', function *() {
    expect(info).to.have.property('interface', 'en1');
  });

  it('should contain the correct flags', function *() {
    expect(info).to.have.deep.property('flags[0]', 'UP');
    expect(info).to.have.deep.property('flags[1]', 'GATEWAY');
    expect(info).to.have.deep.property('flags[2]', 'DONE');
    expect(info).to.have.deep.property('flags[3]', 'STATIC');
    expect(info).to.have.deep.property('flags[4]', 'PRCLONING');
  });
  
  it('should contain the correct recvpipe', function *() {
    expect(info).to.have.property('recvpipe', '0');
  });

  it('should contain the correct sendpipe', function *() {
    expect(info).to.have.property('sendpipe', '0');
  });

  it('should contain the correct ssthresh', function *() {
    expect(info).to.have.property('ssthresh', '0');
  });

  it('should contain the correct rtt_msec', function *() {
    expect(info).to.have.property('rtt_msec', '0');
  });

  it('should contain the correct rttvar', function *() {
    expect(info).to.have.property('rttvar', '0');
  });

  it('should contain the correct hopcount', function *() {
    expect(info).to.have.property('hopcount', '0');
  });

  it('should contain the correct mtu', function *() {
    expect(info).to.have.property('mtu', '1500');
  });

  it('should contain the correct expire', function *() {
    expect(info).to.have.property('expire', '0');
  });
});

