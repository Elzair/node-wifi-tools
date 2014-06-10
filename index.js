var ap_parse = require(__dirname + '/src/airport_parser')
  , exec     = require('child_process').exec
  , os       = require('os')
  , nm_parse = require(__dirname + '/src/nm_parser')
  , ns_parse = require(__dirname + '/src/ns_parser')
  , util     = require('util')
  ;

//var results = cb2y(exec, ['nm-tool']);
if (os.platform() === 'linux') {
  exec('nm-tool', function(error, stdout, stderr) {
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    var nm_out = nm_parse(stdout);
    console.log(JSON.stringify(nm_out, null, 2));
  });
}
else if (os.platform() === 'darwin') {
  exec('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport --getinfo', 
      function(error, stdout, stderr) {
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    var ap_out = ap_parse(stdout);
    exec('netstat -rn', function(nerror, nstdout, nstderr) {
      var ns_out = ns_parse(nstdout);
      console.log(JSON.stringify(ap_out, null, 2));
      console.log(JSON.stringify(ns_out, null, 2));
    });
  });
}
else {
  console.error(util.format('Unsupported platform: %s!', os.platform()));
}
