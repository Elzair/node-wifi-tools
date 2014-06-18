var freq_convert = require(__dirname + '/frequency_converter')
  , s            = require('string')
  ;

module.exports = function(input) {
  var output = {};
  var inp = s(input).lines();

  for (var i=0; i<inp.length; i++) {
    if (inp[i].trim() === '') {
      continue;
    }

    var key = inp[i].substr(0, inp[i].indexOf(':')).trim().toLowerCase().split(' ').join('_'); 
    var val = inp[i].substr(inp[i].indexOf(':')+1, inp[i].length).trim();

    // Make sure BSSID is in the format ab:cd:ef:gh
    if (key === 'bssid') {
      val = val.split(':');
      for (var j=0; j<val.length; j++) {
        val[j] = s(val[j]).padLeft(2, '0');
      }
      val = val.join(':');
    }

    output[key] = val;
  }

  // Add frequency
  output.frequency = freq_convert(output.channel);    

  return output;
};
