var s    = require('string')
  , util = require('util')
  ;

module.exports = function(input) {
  var inp = s(input).lines();
  var is_wifi = false;
  var devices = [];
  var i=-1, j=-1;
  var in_prop = false;
  var curr_prop;
  console.log(inp);
  for (i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('- Device:')) {
      devices.push({});
      j++;
    }
    else if (s(line).startsWith('    ')) {
      line = line.split(':');
      devices[j][curr_prop][line[0].toLowerCase().split(' ').join('_')] = line[1].trim();
    }
    else if (s(line).startsWith('  ')) {
      line = line.split(':');
      // Determine whether it is a single property or a nesting property
      if (line.length > 1) {
        devices[j][line[0].toLowerCase().split(' ').join('_')] = line[1].trim();
      }
      else {
        // Strip out any parentheses
        curr_prop = line[0].toLowerCase().replace(/ *\([^)]*\) */g, "").split(' ').join('_');
        devices[j][curr_prop] = {};
      }
    }
  }
  console.log(util.format('%j', devices));
};
