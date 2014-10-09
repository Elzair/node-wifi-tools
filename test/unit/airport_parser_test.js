var expect   = require('chai').expect
  , co_mocha = require('co-mocha')
  , ap_parse = require(__dirname+'/../../lib/airport_parser')
  , fs       = require('fs')
  ;

describe('airport_parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = JSON.parse(fs.readFileSync(__dirname+'/../data/airport_parser_data.json', 'utf8')).info.join('\n');

    info = ap_parse(test_output);
  });

  it('should contain the correct agrCtlRSSI', function *() {
    expect(info).to.have.property('agrctlrssi', '-54');
  });

  it('should contain the correct agrExtRSSI', function *() {
    expect(info).to.have.property('agrextrssi', '0');
  });

  it('should contain the correct agrCtlNoise', function *() {
    expect(info).to.have.property('agrctlnoise', '-86');
  });

  it('should contain the correct agrExtNoise', function *() {
    expect(info).to.have.property('agrextnoise', '0');
  });

  it('should contain the correct state', function *() {
    expect(info).to.have.property('state', 'running');
  });

  it('should contain the correct op mode', function *() {
    expect(info).to.have.property('op_mode', 'station');
  });

  it('should contain the correct lastTxRate', function *() {
    expect(info).to.have.property('lasttxrate', '150');
  });

  it('should contain the correct maxRate', function *() {
    expect(info).to.have.property('maxrate', '300');
  });

  it('should contain the correct lastAssocStatus', function *() {
    expect(info).to.have.property('lastassocstatus', '0');
  });

  it('should contain the correct 802.11 auth', function *() {
    expect(info).to.have.property('802.11_auth', 'open');
  });

  it('should contain the correct link auth', function *() {
    expect(info).to.have.property('link_auth', 'wpa2');
  });

  it('should contain the correct BSSID', function *() {
    expect(info).to.have.property('bssid', '06:24:0a:88:cd:0f');
  });

  it('should contain the correct SSID', function *() {
    expect(info).to.have.property('ssid', 'test01');
  });

  it('should contain the correct MCS', function *() {
    expect(info).to.have.property('mcs', '7');
  });

  it('should contain the correct channel', function *() {
    expect(info).to.have.property('channel', '36,1');
  });

  it('should contain the correct frequency', function *() {
    expect(info).to.have.deep.property('frequency[0]', '5180000000');
    expect(info).to.have.deep.property('frequency[1]', '40000000');
  });
});
