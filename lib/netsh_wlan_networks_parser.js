var freq_convert = require(__dirname + '/frequency_converter').channel_to_frequency
  , s            = require('string')
  ;

module.exports = function(input) {
  var inp = s(input).lines();
  var aps = [];

  for (var i=0, j=-1, k=-1; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('SSID ')) {
      aps.push({}); 
      aps[++j].ssid = line.substr(line.indexOf(':')+1, line.length).trim();
      aps[j].bssids = [];
      k = -1;
    }
    else if (s(line).startsWith('    BSSID')) {
      aps[j].bssids.push({});
      aps[j].bssids[++k].hw_address = line.substr(line.indexOf(':')+1, line.length).trim();
    }
    else if (s(line).startsWith('        ')) {
      var key = line.substr(0, line.indexOf(':')).trim().replace(/ *\([^]*\) */g, '').toLowerCase().split(' ').join('_');      
      var val = line.substr(line.indexOf(':')+1, line.length).trim();
      aps[j].bssids[k][key] = val;

      // Convert channel to frequency
      if (key === 'channel') {
        aps[j].bssids[k].frequency = freq_convert(val);    
      }
    }
    else if (s(line).startsWith('    ')) {
      aps[j][line.substr(0, line.indexOf(':')).trim().toLowerCase().split(' ').join('_')] = line.substr(line.indexOf(':')+1, line.length).trim();
    }
  }

  return aps;
};
