var s = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var devices = [];
  var i=-1, j=-1;
  var curr_prop;

  for (i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('- Device:')) {
      devices.push({name: line.split(' ')[2]});
      j++;
    }
    else if (s(line).startsWith('    ')) {
      line = [line.substr(0, line.indexOf(':')), line.substr(line.indexOf(':')+1, line.length)];
      devices[j][curr_prop][line[0].trim().toLowerCase().split(' ').join('_')] = line[1].trim();
    }
    else if (s(line).startsWith('  ')) {
      line = line.indexOf(':') > 0 ? [line.substr(0, line.indexOf(':')), line.substr(line.indexOf(':')+1, line.length)] : [line];
      // Determine whether it is a single property or a nesting property
      if (line.length > 1 && line[1] !== '') {
        devices[j][line[0].trim().toLowerCase().split(' ').join('_')] = line[1].trim();
      }
      else {
        // Strip out any parentheses
        curr_prop = line[0].trim().toLowerCase().replace(/ *\([^]*\) */g, '').split(' ').join('_');
        devices[j][curr_prop] = {};
      }
    }
  }

  // Post Processing Wireless Access Points
  for (i=0; i<devices.length; i++) {
    if (devices[i].type === '802.11 WiFi') {
      var aps = devices[i].wireless_access_points;
      var con_ap, app, apl, rest;

      for (var ap in aps) {
        if (ap.charAt(0) === '*') {
          con_ap = ap;
        }
        app = {};
        apl = aps[ap].split(',');
        app.type = apl[0].trim();
        app.hw_address = apl[1].trim();
        app.frequency = apl[2].substring(6);
        app.rate = apl[3].substring(6);
        rest = apl[4].split(' ');
        app.strength = rest[2];
        app.encryption = [];
        for (j=3; j<rest.length; j++) {
          app.encryption.push(rest[j]);
        }
        aps[ap] = app;
      }

      // Replace *con_ap with con_ap
      var new_con_ap = con_ap.substr(1);
      aps[new_con_ap] = aps[con_ap];
      delete aps[con_ap];
    }
  }

  return devices;
};
