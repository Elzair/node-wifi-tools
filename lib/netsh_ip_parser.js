var s    = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var interfaces = {};
  var cur_prop;

  for (var i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('Configuration for interface')) {
      cur_prop = line.substring(29, line.length-1).toLowerCase().split(' ').join('_');
      interfaces[cur_prop] = {};
    }
    else if (s(line).startsWith('  ')) {
      interfaces[cur_prop][line.split(':')[0].trim().toLowerCase().split(' ').join('_')] = line.split(':')[1].trim();
    }
  }

  return interfaces;
};
