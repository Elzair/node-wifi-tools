var ap_parse     = require(__dirname + '/lib/airport_parser')
  , nmt_parse    = require(__dirname + '/lib/nmt_parser')
  , nsh_ip_parse = require(__dirname + '/lib/netsh_ip_parser')
  , nsh_wi_parse = require(__dirname + '/lib/netsh_wlan_interfaces_parser')
  , nsh_wn_parse = require(__dirname + '/lib/netsh_wlan_networks_parser')
  , nst_parse    = require(__dirname + '/lib/netstat_parser')
  , os           = require('os')
  , spawn        = require('co-child-process')
  ;

var get_info_linux = exports.get_info_linux = function *() {
  if (os.platform() !== 'linux') {
    throw "Platform is not linux";
  }

  var nt_out = nmt_parse(yield spawn('nm-tool'));
  return {network_tool: nt_out};
};

var get_info_darwin = exports.get_info_darwin = function *() {
  if (os.platform() !== 'darwin') {
    throw "Platform is not darwin";
  }

  var ap_out = ap_parse(yield spawn('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport', ['--getinfo']));
  var nst_out = nst_parse(yield spawn('netstat', ['-rn']));
  return {airport: ap_out, netstat: nst_out};
};

var get_info_windows = exports.get_info_windows = function *() {
  if (os.platform() !== 'windows') {
    throw "Platform is not windows";
  }

  var nsh_wi_out = nsh_ip_parse(yield spawn('netsh', ['wlan', 'show', 'interfaces']));
  var nsh_ip_out = nsh_wi_parse(yield spawn('netsh', ['interface', 'ip', 'show', 'address']));
  var nsh_wn_out = nsh_wn_parse(yield spawn('netsh', ['wlan', 'show', 'networks', 'mode=bssid']));
  var out = {
      ip_show_address: nsh_ip_out
    , wlan_show_interfaces: nsh_wi_out
    , wlan_show_networks: nsh_wn_out
  };
};

exports.get_info = function*(op_sys) {
  var out = null;

  switch(op_sys) {
    case 'linux':
      out = yield get_info_linux();
      break;
    case 'darwin':
    case 'osx':
      out = yield get_info_darwin();
      break;
    case 'windows':
      out = yield get_info_windows();
      break;
  }

  if (out) {
    return out;
  }

  switch(os.platform()) {
    case 'linux':
      out = yield get_info_linux();
      break;
    case 'darwin':
      out = yield get_info_darwin();
      break;
    case 'windows':
      out = yield get_info_windows();
      break;
    default:
      throw "Unsupported platform: " + os.platform();
  }

  return out;
};
