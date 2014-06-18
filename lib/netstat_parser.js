var s = require('string');

module.exports = function(input) {
  var inp = s(input).lines();
  var routes = {internet: [], internet6: []};
  var in_i = false, in_i6 = false, skip_next = false;

  for (var i =0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('Internet:')) {
      in_i = true;
      in_i6 = false;
      skip_next = true;
    }
    else if (s(line).startsWith('Internet6')) {
      in_i = false;
      in_i6 = true;
      skip_next = true;
    }
    else if (line.trim() === '') {
      continue;
    }
    else if (skip_next === true) {
      skip_next = false;
    }
    else if (in_i) {
      var ii = line.split(/\s+/g);
      routes.internet.push({
          destination: ii[0].trim()
        , gateway: ii[1].trim()
        , flags: ii[2].trim()
        , refs: ii[3].trim()
        , use: ii[4].trim()
        , netif: ii[5].trim()
        , expire: ii[6] ? ii[6].trim() : null
      });
    }
    else if (in_i6) {
      var i6 = line.split(/\s+/g);
      routes.internet6.push({
          destination: i6[0]
        , gateway: i6[1].trim()
        , flags: i6[2].trim()
        , netif: i6[3].trim()
        , expire: i6[4] ? i6[4].trim() : null
      });
    }
  }

  return routes;
};
