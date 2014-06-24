var s    = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var devices = {}, connected_devices = [];
  var name, dev;

  for (var i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('    Name')) {
      name = line.substring(29, line.length);
      dev = name.toLowerCase().split(' ').join('_');
      devices[dev] = {name: name};
    }
    else if (s(line).startsWith('    ')) {
      var curr_prop = line.split(':')[0].trim().replace(/ *\([^]*\) */g, '').toLowerCase().split(' ').join('_');
      var curr_val = line.substring(29, line.length).trim();
      devices[dev][curr_prop] = curr_val;

      // Add device to connected devices if state is connected
      if (curr_prop === 'state' && curr_val === 'connected') {
        connected_devices.push(dev);
      }
    }
  }

  return {
      devices: devices
    , connected_devices: connected_devices
  };
};
