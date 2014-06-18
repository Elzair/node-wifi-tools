var assert   = require('assert')
  , co_mocha = require('co-mocha')
  , ap_parse = require(__dirname+'/../lib/airport_parser')
  ;

describe('airport_parser', function() {
  var info;

  beforeEach(function *() {
    var test_output = [
      , '     agrCtlRSSI: -54'
      , '     agrExtRSSI: 0'
      , '    agrCtlNoise: -86'
      , '    agrExtNoise: 0'
      , '          state: running'
      , '        op mode: station '
      , '     lastTxRate: 150'
      , '        maxRate: 300'
      , 'lastAssocStatus: 0'
      , '    802.11 auth: open'
      , '      link auth: wpa2'
      , '          BSSID: 6:24:a:88:cd:f'
      , '           SSID: test01'
      , '            MCS: 7'
      , '        channel: 36,1'
      , ''
    ].join('\n');

    info = ap_parse(test_output);
  });

  it('should contain the correct agrCtlRSSI', function *() {
    assert.strictEqual(info.agrctlrssi, '-54');
  });

  it('should contain the correct agrExtRSSI', function *() {
    assert.strictEqual(info.agrextrssi, '0');
  });

  it('should contain the correct agrCtlNoise', function *() {
    assert.strictEqual(info.agrctlnoise, '-86');
  });

  it('should contain the correct agrExtNoise', function *() {
    assert.strictEqual(info.agrextnoise, '0');
  });

  it('should contain the correct state', function *() {
    assert.strictEqual(info.state, 'running');
  });

  it('should contain the correct op mode', function *() {
    assert.strictEqual(info.op_mode, 'station');
  });

  it('should contain the correct lastTxRate', function *() {
    assert.strictEqual(info.lasttxrate, '150');
  });

  it('should contain the correct maxRate', function *() {
    assert.strictEqual(info.maxrate, '300');
  });

  it('should contain the correct lastAssocStatus', function *() {
    assert.strictEqual(info.lastassocstatus, '0');
  });

  it('should contain the correct 802.11 auth', function *() {
    assert.strictEqual(info['802.11_auth'], 'open');
  });

  it('should contain the correct link auth', function *() {
    assert.strictEqual(info.link_auth, 'wpa2');
  });

  it('should contain the correct BSSID', function *() {
    assert.strictEqual(info.bssid, '06:24:0a:88:cd:0f');
  });

  it('should contain the correct SSID', function *() {
    assert.strictEqual(info.ssid, 'test01');
  });

  it('should contain the correct MCS', function *() {
    assert.strictEqual(info.mcs, '7');
  });

  it('should contain the correct channel', function *() {
    assert.strictEqual(info.channel, '36,1');
  });

  it('should contain the correct frequency', function *() {
    assert.strictEqual(info.frequency[0], "5180000000");
    assert.strictEqual(info.frequency[1], "40000000");
  });
});
