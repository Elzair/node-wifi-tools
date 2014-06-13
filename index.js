var ap_parse = require(__dirname + '/lib/airport_parser')
  , nm_parse = require(__dirname + '/lib/netman_parser')
  , ns_parse = require(__dirname + '/lib/netstat_parser')
  , os       = require('os')
  , spawn    = require('co-child-process')
  ;

exports.get_info = function*(cb) {
  if (os.platform() === 'linux') {
    var nt_out = yield spawn('nm-tool');
    return {network_tool: nm_parse(nt_out)};
  }
  else if (os.platform() === 'darwin') {
    var ap_out = yield spawn('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport', ['--getinfo']);
    var ns_out = yield spawn('netstat', ['-rn']);
    return {airport: ap_parse(ap_out), netstat: ns_parse(ns_out)};
  }
  else {
    throw "Unsupported platform: " + os.platform();
  }
};
