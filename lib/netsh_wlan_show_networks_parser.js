var freq_convert = require(__dirname + '/frequency_converter').channel_to_frequency
  , s            = require('string')
  ;

module.exports = function(input) {
  var inp = s(input).lines();
  var aps = {};
  var ssid = '', bssid = '', key = null, val = null;

  for (var i=0; i<inp.length; i++) {
    var line = inp[i];
    if (s(line).startsWith('SSID ')) {
      ssid = line.substring(line.indexOf(':')+1, line.length).trim();
      aps[ssid.toLowerCase().split(' ').join('_')] = {ssid: ssid};
      aps[ssid.toLowerCase().split(' ').join('_')].access_points = {};
    }
    else if (s(line).startsWith('    BSSID')) {
      bssid = line.substring(line.indexOf(':')+1, line.length).trim();
      aps[ssid.toLowerCase().split(' ').join('_')].access_points[bssid.toLowerCase().split(':').join('_')] = {bssid: bssid};
    }
    else if (s(line).startsWith('        ')) {
      key = line.substring(0, line.indexOf(':')).trim().replace(/ *\([^]*\) */g, '').toLowerCase().split(' ').join('_');      
      val = line.substring(line.indexOf(':')+1, line.length).trim();
      aps[ssid.toLowerCase().split(' ').join('_')].access_points[bssid.toLowerCase().split(':').join('_')][key] = val;

      // Convert channel to frequency
      if (key === 'channel') {
        aps[ssid.toLowerCase().split(' ').join('_')].access_points[bssid.toLowerCase().split(':').join('_')].frequency = freq_convert(val);
      }
    }
    else if (s(line).startsWith('    ')) {
      key = line.substring(0, line.indexOf(':')).trim().toLowerCase().split(' ').join('_');
      val = line.substring(line.indexOf(':')+1, line.length).trim();
      aps[ssid.toLowerCase().split(' ').join('_')][key] = val;
    }
  }

  return aps;
};
