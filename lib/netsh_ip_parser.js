var s    = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var interfaces = {};
  var cur_prop, con_name;

  for (var i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('Configuration for interface')) {
      con_name = line.substring(29, line.length-1);
      cur_prop = con_name.toLowerCase().split(' ').join('_');
      interfaces[cur_prop] = {name: con_name};
    }
    else if (s(line).startsWith('  ')) {
      interfaces[cur_prop][line.split(':')[0].trim().toLowerCase().split(' ').join('_')] = line.split(':')[1].trim();
    }
  }

  return interfaces;
};
