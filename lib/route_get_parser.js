var s = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var info = {};
  var others_keys = null, others_values, in_others = false;

  for (var i=0; i<inp.length; i++) {
    if (inp[i].indexOf(':') >= 0) {
      var key = inp[i].split(':')[0].trim(), val = inp[i].split(':')[1].trim();
      switch(key) {
        case 'flags':
          info.flags = val.substring(1, val.length-1).split(','); 
          break;
        default:
          info[key.split(' ').join('_')]= val;
          break;
      }
    }
    else if (s(inp[i].trim()).startsWith('recvpipe')) {
      in_others = true;
      others_keys = inp[i].trim().replace(/,/g, '_').split(/\W+/g);
    }
    else if (in_others) {
      in_others = false;
      others_values = inp[i].trim().split(/\W+/g);
      for (var j=0; j<others_keys.length; j++) {
        info[others_keys[j]] = others_values[j];
      }
    }
  }

  return info;
};
