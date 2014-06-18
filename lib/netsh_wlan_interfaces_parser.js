var s    = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var interfaces = [];
  var cur_prop;

  for (var i=0, j=-1; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('    Name')) {
      interfaces.push({});
      interfaces[++j].name = line.substring(29, line.length);
    }
    else if (s(line).startsWith('    ')) {
      interfaces[j][line.split(':')[0].trim().replace(/ *\([^]*\) */g, '').toLowerCase().split(' ').join('_')] = line.substring(29, line.length).trim();
    }
  }

  return interfaces;
};
