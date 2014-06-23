var s = require('string');

module.exports = function(input) {
  var inp = s(input).lines();

  var mtu = inp[0].split(' ')[2];

  return {mtu: mtu};
};
