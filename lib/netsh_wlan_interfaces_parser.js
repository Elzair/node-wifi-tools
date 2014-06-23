var s    = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var interfaces = {};
  var name;

  for (var i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('    Name')) {
      name = line.substring(29, line.length);
      interfaces[name.toLowerCase().split(' ').join('_')] = {name: name};
    }
    else if (s(line).startsWith('    ')) {
      var cur_prop = line.split(':')[0].trim().replace(/ *\([^]*\) */g, '').toLowerCase().split(' ').join('_');
      interfaces[name.toLowerCase().split(' ').join('_')][cur_prop] = line.substring(29, line.length).trim();
    }
  }

  return interfaces;
};
