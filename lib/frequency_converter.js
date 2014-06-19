var fs = require('fs');

exports.channel_to_frequency = function(input) {
  var channel_frequencies = JSON.parse(fs.readFileSync(__dirname+'/../conf/wifi_channels.json', 'utf8'));

  return channel_frequencies[input];
};

exports.frequency_parse = function(input) {
  var si_units = {
      'Hz': 1
    , 'kHz': 1000
    , 'MHz': 1000000
    , 'GHz': 1000000000
  };

  var pos = /[kMG]{0,1}Hz/.exec(input).index;
  var freq = Number.parseFloat(input.substr(0, pos).trim());
  var unit = input.substr(pos);

  if (si_units.hasOwnProperty(unit)) {
    unit = si_units[unit];
  }
  else {
    throw "Invalid SI Unit: " + unit;
  }

  freq *= unit;
  
  return freq.toString();
};
