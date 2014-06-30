var ap_parse     = require(__dirname + '/lib/airport_parser')
  , iasd_parse   = require(__dirname + '/lib/ip_addr_show_dev_parser')
  , nmt_parse    = require(__dirname + '/lib/nmtool_parser')
  , nsh_ia_parse = require(__dirname + '/lib/netsh_interface_ip_show_address_parser')
  , nsh_is_parse = require(__dirname + '/lib/netsh_interface_ipv4_show_subinterfaces_parser')
  , nsh_wi_parse = require(__dirname + '/lib/netsh_wlan_show_interfaces_parser')
  , nsh_wn_parse = require(__dirname + '/lib/netsh_wlan_show_networks_parser')
  , rg_parse     = require(__dirname + '/lib/route_get_parser')
  , os           = require('os')
  , spawn        = require('co-child-process')
  ;

var get_info_linux = exports.get_info_linux = function *() {
  if (os.platform() !== 'linux') {
    throw "Platform is not linux";
  }

  var nmt_out = nmt_parse(yield spawn('nm-tool'));

  // Get MTU (and other properties) for all the connected devices
  for (var i=0; i<nmt_out.connected_devices.length; i++) {
    var con_dev = nmt_out.connected_devices[i];
    nmt_out.devices[con_dev].device_info = iasd_parse(yield spawn('ip', ['addr', 'show', 'dev', con_dev]));
  }

  return nmt_out;
};

var get_info_darwin = exports.get_info_darwin = function *() {
  if (os.platform() !== 'darwin') {
    throw "Platform is not darwin";
  }

  var ap_out = ap_parse(yield spawn('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport', ['--getinfo']));
  var rg_out = rg_parse(yield spawn('route', ['get', '8.8.8.8']));
  return {airport: ap_out, route: rg_out};
};

var get_info_windows = exports.get_info_windows = function *() {
  if (os.platform() !== 'windows') {
    throw "Platform is not windows";
  }

  var nsh_wi_out = nsh_wi_parse(yield spawn('netsh', ['wlan', 'show', 'interfaces']));
  var nsh_ia_out = nsh_ia_parse(yield spawn('netsh', ['interface', 'ip', 'show', 'address']));
  var nsh_is_out = nsh_is_parse(yield spawn('netsh', ['interface', 'ipv4', 'show', 'subinterfaces']));
  var nsh_wn_out = nsh_wn_parse(yield spawn('netsh', ['wlan', 'show', 'networks', 'mode=bssid']));

  // Format output
  for (var iface in nsh_wi_out.devices) {
    if (nsh_wi_out.devices.hasOwnProperty(iface) && nsh_ia_out.hasOwnProperty(iface)) {
      nsh_wi_out.devices[iface].ip_info = nsh_ia_out[iface];
    }
    if (nsh_wi_out.hasOwnProperty(iface) && nsh_is_out.hasOwnProperty(iface)) {
      nsh_wi_out.devices[iface].ipv4_info = nsh_is_out[iface];
    }
  }

  var out = {
      interfaces: nsh_wi_out
    , networks: nsh_wn_out
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
