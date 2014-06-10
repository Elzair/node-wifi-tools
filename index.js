var ap_parse = require(__dirname + '/src/airport_parser')
  , cb2y     = require('cb2yield')
  , exec     = require('child_process').exec
  , os       = require('os')
  , nm_parse = require(__dirname + '/src/nm_parser')
  , util     = require('util')
  ;

//var results = cb2y(exec, ['nm-tool', {cb2yield_cb_placeholder: true}]);
function *get_info() {
  if (os.platform() === 'linux') {
    var devices = yield cb2y(exec, ['nm-tool']);
    console.log(util.format('%j', devices));
    //exec('nm-tool', function(error, stdout, stderr) {
    //  console.log('stderr: ' + stderr);
    //  if (error !== null) {
    //    console.log('exec error: ' + error);
    //  }
    //  var devices = nm_parse(stdout);
    //  console.log(util.format('%j', devices));
    //});
  }
  else if (os.platform() === 'darwin') {
    var out = yield cb2y(exec, ['/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport --getinfo']);
    console.log(util.format('%j', out));
    //exec('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport --getinfo', 
    //    function(error, stdout, stderr) {
    //  console.log('stderr: ' + stderr);
    //  if (error !== null) {
    //    console.log('exec error: ' + error);
    //  }
    //  var devices = ap_parse(stdout);
    //  console.log(util.format('%j', devices));
    //});
  }
  else {
    console.error(util.format('Unsupported platform: %s!', os.platform()));
  }
}

get_info();
