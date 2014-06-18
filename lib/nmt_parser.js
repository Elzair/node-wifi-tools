var s    = require('string')
  , util = require('util')
  ;

module.exports = function(input) {
  var inp = s(input).lines();
  var devices = [];
  var i=-1, j=-1, k=0;
  var curr_prop;

  for (i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('- Device:')) {
      devices.push({name: line.split(' ')[2]});
      j++;
    }
    else if (s(line).startsWith('    ')) {
      line = [line.substr(0, line.indexOf(':')), line.substr(line.indexOf(':')+1, line.length)];
      var curr_subprop = line[0].trim().toLowerCase().split(' ').join('_'), count = 1;
      // Handle situation when two sub-properties have the same name
      while (devices[j][curr_prop].hasOwnProperty(curr_subprop)) {
        curr_subprop = util.format('%s_%d', curr_subprop.replace(/_\d+$/, ''), count++);
      }
      // Handle "Wireless Access Points" section
      if (curr_prop === 'wireless_access_points') {
        var ap = line[0].trim();
        var apl = line[1].split(',');
        var rest = apl[4].split(' ');

        // Determine if the user is connected to the current access point
        if (ap.charAt(0) === '*') {
          ap = ap.substring(1, ap.length);
          curr_subprop = ap.split(' ').join('_');
          devices[j].connected_ap = ap;
        } 

        devices[j][curr_prop][curr_subprop] = {
            ssid: ap 
          , network_type: apl[0].trim()
          , bssid: apl[1].trim()
          , frequency: apl[2].substring(6)
          , rate: apl[3].substring(6)
          , strength: rest[2]
          , encryption: []
        };

        for (k=3; k<rest.length; k++) {
          devices[j][curr_prop][curr_subprop].encryption.push(rest[k]);
        }
      }
      else {
        devices[j][curr_prop][curr_subprop] = line[1].trim();
      }
    }
    else if (s(line).startsWith('  ')) {
      line = line.indexOf(':') > 0 ? [line.substr(0, line.indexOf(':')), line.substr(line.indexOf(':')+1, line.length)] : [line];
      // Determine whether it is a single property or a nesting property
      if (line.length > 1 && line[1] !== '') {
        devices[j][line[0].trim().toLowerCase().split(' ').join('_')] = line[1].trim();
      }
      else {
        // Strip out any parenthetical statements
        curr_prop = line[0].trim().toLowerCase().replace(/ *\([^]*\) */g, '').split(' ').join('_');
        devices[j][curr_prop] = {};
      }
    }
  }

  return devices;
};
