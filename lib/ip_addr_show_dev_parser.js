var s = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var info = {};
  
  // Right now, parse only the first line
  var line = inp[0];

  info.flags = line.split(' ')[2].replace(/[<>]/g, '').split(',');
  
  // Process rest of line
  var rest = line.split(' ').slice(3);
  for (var i=0; i<rest.length; i+=2) {
    info[rest[i].toLowerCase()] = rest[i+1];
  }

  return info;
};
