var fs = require('fs');

module.exports = function(input) {
  var channel_frequencies = JSON.parse(fs.readFileSync(__dirname+'/../conf/wifi_channels.json', 'utf8'));

  return channel_frequencies[input];
};
