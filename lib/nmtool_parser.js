var freq_convert = require(__dirname + '/frequency_converter').frequency_parse
  , s    = require('string')
  , util = require('util')
  ;

module.exports = function(input) {
  var inp = s(input).lines();
  var devices = {}, connected_devices = [];
  var i=-1, j=0;
  var curr_device, curr_prop;

  for (i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('- Device:')) {
      //devices.push({name: line.split(' ')[2]});
      curr_device = line.split(' ')[2];
      devices[curr_device] = {name: curr_device};
    }
    else if (s(line).startsWith('    ')) {
      var key = line.substring(0, line.indexOf(':'));
      var value = line.substr(line.indexOf(':')+1, line.length);
      var curr_subprop = key.trim().toLowerCase().split(' ').join('_');

      // Handle situation when two sub-properties have the same name
      var count = 1;
      while (devices[curr_device][curr_prop].hasOwnProperty(curr_subprop)) {
        curr_subprop = util.format('%s_%d', curr_subprop.replace(/_\d+$/, ''), count++);
      }

      // Handle "Wireless Access Points" section
      if (curr_prop === 'wireless_access_points') {
        var ap = key.trim();
        var apl = value.split(',');
        var rest = apl[4].split(' ');

        // Determine if the user is connected to the current access point
        if (ap.charAt(0) === '*') {
          ap = ap.substring(1, ap.length);
          curr_subprop = ap.split(' ').join('_');
          devices[curr_device].connected_ap = ap;
        } 

        devices[curr_device][curr_prop][curr_subprop] = {
            ssid: ap 
          , network_type: apl[0].trim()
          , bssid: apl[1].trim()
          , frequency: freq_convert(apl[2].substring(6))
          , rate: apl[3].substring(6)
          , strength: rest[2]
          , encryption: []
        };

        for (j=3; j<rest.length; j++) {
          devices[curr_device][curr_prop][curr_subprop].encryption.push(rest[j]);
        }
      }
      else {
        devices[curr_device][curr_prop][curr_subprop] = value.trim();
      }
    }
    else if (s(line).startsWith('  ')) {
      line = line.indexOf(':') > 0 ? [line.substr(0, line.indexOf(':')), line.substr(line.indexOf(':')+1, line.length)] : [line];
      // Strip out any parenthetical statements
      curr_prop = line[0].trim().toLowerCase().replace(/ *\([^]*\) */g, '').split(' ').join('_');

      // Determine whether it is a single property or a nesting property
      if (line.length > 1 && line[1] !== '') {
        devices[curr_device][curr_prop] = line[1].trim();

        // Add device name to connected_devices if state is connected
        if (curr_prop === 'state' && line[1].trim() === 'connected') {
          connected_devices.push(curr_device);
        }
      }
      else {
        devices[curr_device][curr_prop] = {};
      }
    }
  }

  return {
      devices: devices
    , connected_devices: connected_devices
  };
  
};
