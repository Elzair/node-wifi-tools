var ap_parse  = require(__dirname + '/lib/airport_parser')
  , nmt_parse = require(__dirname + '/lib/nmt_parser')
  , nsh_ip_parse = require(__dirname + '/lib/netsh_ip_parser')
  , nst_parse = require(__dirname + '/lib/netstat_parser')
  , os        = require('os')
  , spawn     = require('co-child-process')
  ;

exports.get_info = function*(cb) {
  if (os.platform() === 'linux') {
    var nt_out = yield spawn('nm-tool');
    return {network_tool: nmt_parse(nt_out)};
  }
  else if (os.platform() === 'darwin') {
    var ap_out = yield spawn('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport', ['--getinfo']);
    var nst_out = yield spawn('netstat', ['-rn']);
    return {airport: ap_parse(ap_out), netstat: nst_parse(nst_out)};
  }
  else if (os.platform() === 'windows') {
    var nsh_ip_out = yield spawn('netsh', ['interface', 'ip', 'show', 'address']);
    return {ip_show_address: nsh_ip_out};
  }
  else {
    throw "Unsupported platform: " + os.platform();
  }
};
