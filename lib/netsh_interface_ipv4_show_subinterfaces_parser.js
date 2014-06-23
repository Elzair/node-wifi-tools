var s = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var interfaces = {}, mtu, medsenstate, bytes_in, bytes_out, iface;

  for (var i=0; i<inp.length; i++) {
    var line = inp[i].trim().split(/\s+/);
    if (Number.parseInt(line[0])) {
      interfaces[line.slice(4).join('_').toLowerCase()] = {
          mtu: line[0]
        , media_sense_state: line[1]
        , bytes_in: line[2]
        , bytes_out: line[3]
      };
    }
  }

  return interfaces;
};
