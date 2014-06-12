var s = require('string');

module.exports = function(input) {
  var output = {};
  var inp = s(input).lines();

  for (var i=0; i<inp.length; i++) {
    if (inp[i].trim() === '') {
      continue;
    }

    var line = [inp[i].substr(0, inp[i].indexOf(':')), inp[i].substr(inp[i].indexOf(':')+1, inp[i].length)];
    output[line[0].trim().toLowerCase().split(' ').join('_')] = line[1].trim();
  }

  return output;
};
